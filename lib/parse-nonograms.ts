import { ImageOutputMode, imageOutputModeScale } from "./image-output-mode";
import { UjcFile } from "./parse-ujc-files";
import { writeCanvasToBlob } from "./write-canvas-to-blob";

export interface Nonogram {
  /** Rendered nonogram png file */
  pngFile: File;
  /** Object URL for image display */
  pngFileObjectUrl: string;
  /** Timestamp in ISO 8601 format for when the nonogram was created */
  timestamp: string;

  // /** Name for the nonogram */
  // name?: string;
  // /** Alternative name for the nonogram */
  // altName?: string;
  // /** Name of the nonogram's author */
  // author?: string;
  // /** Nonogram width */
  // width?: number;
  // /** Nonogram height */
  // height?: number;
}

export async function parseNonograms(
  ujcFiles: UjcFile[],
  mode: ImageOutputMode
): Promise<Nonogram[]> {
  const results = await Promise.allSettled(
    ujcFiles.map((ujcFile) => parseNonogram(ujcFile, mode))
  );

  // Keep only successfully parsed nonograms and order from oldest to newest
  const nonograms = results
    .flatMap((result) => {
      if (result.status === "rejected") {
        return [];
      }
      return result.value;
    })
    .sort((a, b) => {
      return a.timestamp.localeCompare(b.timestamp);
    });
  return nonograms;
}

async function parseNonogram(
  ujcFile: UjcFile,
  mode: ImageOutputMode
): Promise<Nonogram> {
  const pngFile = await parsePngFile(ujcFile, mode);
  const pngFileObjectUrl = URL.createObjectURL(pngFile);
  const timestamp = ujcFile.timestamp;
  return {
    pngFile,
    pngFileObjectUrl,
    timestamp,
  };
}

async function parsePngFile(
  ujcFile: UjcFile,
  mode: ImageOutputMode
): Promise<File> {
  const pngBlob = await renderPng(ujcFile, mode);
  const pngFilename = ujcFile.filename.replace(".ujc", ".png");
  return new File([pngBlob], pngFilename, {
    type: "image/png",
    lastModified: new Date(ujcFile.timestamp).getTime(),
  });
}

async function renderPng(
  ujcFile: UjcFile,
  mode: ImageOutputMode
): Promise<Blob> {
  if (mode === "raw") {
    return ujcFile.pngBlob;
  }
  const recoloredPng = await recolorPng(ujcFile.pngBlob);
  const scale = imageOutputModeScale(mode);
  if (scale === 1) {
    return recoloredPng;
  }
  const scaledPng = await scalePng(recoloredPng, scale);
  return scaledPng;
}

async function recolorPng(input: Blob): Promise<Blob> {
  // Get canvas and context
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  // const canvas = document.getElementById("recolor-canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Create image and wait until it's loaded
  const imageUrl = URL.createObjectURL(input);
  const image = new Image();
  image.src = imageUrl;
  await image.decode();

  // Resize canvas to fit image
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw image on canvas and get pixel data.
  // NOTE: actual pixel data may differ from raw pixel data depending on the browser.
  // See spec https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata
  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixelData = imageData.data;

  // The background color of colored nonograms is set with alpha = 128.
  // Reset every pixel to full alpha.
  // See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
  for (let i = 0; i < pixelData.length; i += 4) {
    pixelData[i + 3] = 255;
  }

  // Replace image data and extract recolored image
  context.putImageData(imageData, 0, 0);
  const output = await writeCanvasToBlob(canvas);

  // Revoke temporary object url
  URL.revokeObjectURL(imageUrl);

  return output;
}

async function scalePng(input: Blob, scale: number): Promise<Blob> {
  // Get canvas and context
  const canvas = document.createElement("canvas") as HTMLCanvasElement;
  // const canvas = document.getElementById("scale-canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Create image and wait until it's loaded
  const imageUrl = URL.createObjectURL(input);
  const image = new Image();
  image.src = imageUrl;
  await image.decode();

  // Resize canvas to fit scaled image
  canvas.width = scale * image.width;
  canvas.height = scale * image.height;

  // Disable image smoothing for sharp pixel art scaling
  context.imageSmoothingEnabled = false;

  // Set scaling factor
  context.scale(scale, scale);

  // Draw image on canvas
  context.drawImage(image, 0, 0);
  const output = await writeCanvasToBlob(canvas);

  // Revoke temporary object url
  URL.revokeObjectURL(imageUrl);

  return output;
}
