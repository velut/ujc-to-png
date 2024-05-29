import { canvasToBlob } from "./canvas-to-blob";
import { setupCanvas } from "./setup-canvas";

export const recolorImage = async (blob: Blob): Promise<Blob> => {
	const { canvas, context } = await setupCanvas(blob);

	// NOTE: Browsers don't return the exact original pixel colors.
	// See https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata.
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
	const pixels = imageData.data;

	// Reset pixels to full alpha since nonogram background color uses `alpha = 128`.
	// See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas.
	for (let i = 0; i < pixels.length; i += 4) {
		pixels[i + 3] = 255;
	}

	// Replace original data with recolored data.
	context.putImageData(imageData, 0, 0);

	return canvasToBlob(canvas);
};
