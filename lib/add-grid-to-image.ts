import { canvasToBlob } from "./canvas-to-blob";
import { loadImage } from "./load-image";

export const addGridToImage = async (
  /** blob must be a 1:1 pixel image (that is, not scaled) */
  blob: Blob,
  scale: number,
  strokeSize: number,
  strokeColor: string
): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const image = await loadImage(blob);

  // Draw image on canvas.
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);

  // Get pixel data.
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

  // Resize and reset canvas.
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
      context.fillRect(
        x * (strokeSize + scale) + strokeSize,
        y * (strokeSize + scale) + strokeSize,
        scale,
        scale
      );
    }
  }

  return canvasToBlob(canvas);
};
