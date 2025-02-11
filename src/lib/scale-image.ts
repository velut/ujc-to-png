import { canvasToBlob } from "./canvas-to-blob";
import { setupCanvas } from "./setup-canvas";

export const scaleImage = async (blob: Blob, scale: number): Promise<Blob> => {
  const { canvas, context, image } = await setupCanvas(blob);

  // Resize canvas to fit scaled image.
  canvas.width = scale * image.width;
  canvas.height = scale * image.height;

  context.imageSmoothingEnabled = false; // Sharp pixel art scaling.
  context.scale(scale, scale); // Set scaling factor.
  context.drawImage(image, 0, 0);

  return canvasToBlob(canvas);
};
