import { loadImage } from "./load-image";

export const parseImageDimensions = async (blob: Blob) => {
	const { width, height } = await loadImage(blob);
	return { width, height };
};
