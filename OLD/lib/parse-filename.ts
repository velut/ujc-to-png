export const parseFilename = (filename: string): string => {
	return filename.trim().replace(".ujc", "").replace(".png", "");
};
