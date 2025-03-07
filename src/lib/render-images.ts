import pMap, { pMapSkip } from "p-map";
import { loadImage } from "./load-image";
import type { Nonogram } from "./parse-nonograms";

export type Image = {
  /* Image file. */
  file: File;

  /* Image file's object URL. */
  url: string;
};

export type RenderOptions = {
  /* True if the images should be recolored (lossy operation). */
  recolor: boolean;

  /* Multiplier for scaling images (lossy operation). */
  scale: number;

  /* Style images by adding pixel grid lines (lossy operation). */
  grid: {
    /* True if the grid should be enabled. */
    enabled: boolean;

    /* Stroke size in pixels for grid lines. */
    size: number;

    /* Stroke color in hex format for grid lines. */
    color: string;

    /* Radius for rounding borders of original pixels. */
    radius: number;
  };
};

export async function renderImages(
  nonograms: Nonogram[],
  options: RenderOptions,
): Promise<Image[]> {
  return (
    await pMap(
      nonograms,
      async (nonogram) => {
        try {
          const blob = await renderImage(
            nonogram.pngData,
            normalizeRenderOptions(options),
          );
          const file = new File([blob], `${nonogram.filename}.png`, {
            type: "image/png",
            lastModified: new Date(nonogram.timestamp).getTime(),
          });
          const url = URL.createObjectURL(file);
          return { file, url };
        } catch {
          return pMapSkip;
        }
      },
      { concurrency: 8 },
    )
  ).sort((a, b) => a.file.lastModified - b.file.lastModified);
}

function normalizeRenderOptions(options: RenderOptions): RenderOptions {
  return {
    recolor: Boolean(options.recolor),
    scale: Number.isInteger(Number(options.scale))
      ? Math.max(1, Number(options.scale))
      : 1,
    grid: {
      enabled: Boolean(options.grid.enabled),
      size: Number.isInteger(Number(options.grid.size))
        ? Math.max(1, Number(options.grid.size))
        : 1,
      color: options.grid.color,
      radius: Number.isInteger(Number(options.grid.radius))
        ? Math.max(0, Number(options.grid.radius))
        : 0,
    },
  };
}

async function renderImage(
  blob: Blob,
  { recolor, scale, grid }: RenderOptions,
): Promise<Blob> {
  let image = blob;
  if (recolor) {
    image = await recolorImage(image);
  }
  if (scale > 1 && !grid.enabled) {
    image = await scaleImage(image, scale);
  }
  if (grid.enabled) {
    image = await addGridToImage(
      image,
      scale,
      grid.size,
      grid.color,
      grid.radius,
    );
  }
  return image;
}

async function recolorImage(blob: Blob): Promise<Blob> {
  const { canvas, context } = await setupCanvas(blob);

  // Get pixels data.
  // NOTE: Browsers don't return the exact original pixel colors.
  // See https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata.
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Reset pixels to full alpha since the background color for colored nonograms uses `alpha = 128`.
  // See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas.
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i + 3] = 255;
  }

  // Replace original data with recolored data.
  context.putImageData(imageData, 0, 0);

  // Save image painted on canvas to blob.
  return await canvasToBlob(canvas);
}

async function scaleImage(blob: Blob, scale: number): Promise<Blob> {
  const { canvas, context, image } = await setupCanvas(blob);

  // Resize canvas to fit scaled image.
  canvas.width = scale * image.width;
  canvas.height = scale * image.height;

  // Clear canvas.
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Sharp pixel art scaling.
  context.imageSmoothingEnabled = false;

  // Set scaling factor for both dimensions.
  context.scale(scale, scale);

  // Draw scaled up image.
  context.drawImage(image, 0, 0);

  return await canvasToBlob(canvas);
}

async function addGridToImage(
  /** blob must be a 1:1 pixel image (that is, not scaled) */
  blob: Blob,
  scale: number,
  strokeSize: number,
  strokeColor: string,
  borderRadius: number,
): Promise<Blob> {
  const { canvas, context, image } = await setupCanvas(blob);

  // Get pixels data.
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // The new width (height) of the image with the grid equals to the sum of:
  // a) the width (height) of the possibly scaled image without the grid,
  //    since the grid only adds space to the image without removing anything;
  // b) the pixel width (height) plus 1 multiplied by the line stroke size,
  //    this can be imagined as the number of columns (rows) in which the grid
  //    divides the image to insert the lines; for example, for 3 columns
  //    we need 4 grid lines (2 for dividing columns and 2 as external borders),
  //    each having a certain stroke size.
  const newWidth = scale * image.width + (image.width + 1) * strokeSize;
  const newHeight = scale * image.height + (image.height + 1) * strokeSize;

  // Resize and clear canvas.
  canvas.width = newWidth;
  canvas.height = newHeight;
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Fill canvas with grid color.
  context.fillStyle = strokeColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Add back possibly scaled pixels to the canvas.
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      // Get original pixel colors.
      const redIndex = y * (image.width * 4) + x * 4;
      const red = pixels[redIndex];
      const green = pixels[redIndex + 1];
      const blue = pixels[redIndex + 2];
      const alpha = pixels[redIndex + 3] / 255;

      // Paint possibly scaled pixel.
      context.fillStyle = `rgb(${red}, ${green}, ${blue}, ${alpha})`;
      const cornerX = x * (strokeSize + scale) + strokeSize;
      const cornerY = y * (strokeSize + scale) + strokeSize;
      if (borderRadius <= 0) {
        // Square rectangle.
        context.fillRect(cornerX, cornerY, scale, scale);
      } else {
        // Rounded rectangle.
        context.beginPath();
        context.roundRect(cornerX, cornerY, scale, scale, borderRadius);
        context.fill();
      }
    }
  }

  return await canvasToBlob(canvas);
}

async function setupCanvas(blob: Blob) {
  // Create canvas and load image.
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const image = await loadImage(blob);

  // Resize canvas to fit image.
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw image on canvas.
  context.drawImage(image, 0, 0);

  return { canvas, context, image };
}

async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject("cannot write canvas to blob");
        }
      },
      "image/png",
      1.0,
    );
  });
}
