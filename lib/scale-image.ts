import { canvasToBlob } from "./canvas-to-blob";
import { loadImage } from "./load-image";

export const scaleImage = async (blob: Blob, scale: number): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const image = await loadImage(blob);

  // Resize canvas to fit scaled image.
  canvas.width = scale * image.width;
  canvas.height = scale * image.height;

  context.imageSmoothingEnabled = false; // Sharp pixel art scaling.
  context.scale(scale, scale); // Set scaling factor.
  context.drawImage(image, 0, 0);

  return canvasToBlob(canvas);
};
