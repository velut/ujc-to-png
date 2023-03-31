import { canvasToBlob } from "./canvas-to-blob";
import { loadImage } from "./load-image";

export const recolorImage = async (blob: Blob): Promise<Blob> => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d")!;
  const image = await loadImage(blob);

  // Resize canvas to fit image.
  canvas.width = image.width;
  canvas.height = image.height;

  context.drawImage(image, 0, 0);

  // NOTE: Browsers don't return the exact original pixel colors.
  // See https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata.
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;

  // Reset pixels to full alpha since nonogram background color uses `alpha = 128`.
  // See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas.
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i + 3] = 255;
  }

  context.putImageData(imageData, 0, 0); // Replace image data.

  return canvasToBlob(canvas);
};
