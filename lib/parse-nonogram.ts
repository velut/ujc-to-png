import { Nonogram } from "./nonogram";
import { parseFilename } from "./parse-filename";
import { parsePngData } from "./parse-png-data";
import { parseTimestamp } from "./parse-timestamp";

export const parseNonogram = async (file: File): Promise<Nonogram> => {
  const buffer = await file.arrayBuffer();
  return {
    filename: parseFilename(file.name),
    timestamp: parseTimestamp(file.name),
    pngData: parsePngData(buffer),
  };
};

export const parseNonograms = async (files: File[]): Promise<Nonogram[]> => {
  return (await Promise.allSettled(files.map((file) => parseNonogram(file))))
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort((a, b) => a.timestamp.localeCompare(b.timestamp));
};
