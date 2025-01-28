import { limit } from "./limit";
import { Nonogram } from "./nonogram";
import { parseFilename } from "./parse-filename";
import { parseImageDimensions } from "./parse-image-dimensions";
import { parsePngData } from "./parse-png-data";
import { parseTimestamp } from "./parse-timestamp";

export const parseNonogram = async (file: File): Promise<Nonogram> => {
	const buffer = await file.arrayBuffer();
	const filename = parseFilename(file.name);
	const timestamp = parseTimestamp(file.name);
	const pngData = parsePngData(buffer);
	const { width, height } = await parseImageDimensions(pngData);
	return { filename, timestamp, pngData, width, height };
};

export const parseNonograms = async (files: File[]): Promise<Nonogram[]> => {
	return (await Promise.allSettled(files.map((file) => limit(() => parseNonogram(file)))))
		.flatMap((result) => (result.status === "fulfilled" ? result.value : []))
		.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
};
