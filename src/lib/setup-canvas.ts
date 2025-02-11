import { loadImage } from "./load-image";

export const setupCanvas = async (blob: Blob) => {
  // Create canvas and load image.
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const image = await loadImage(blob);

  // Resize canvas and draw image.
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);

  return { canvas, context, image };
};
