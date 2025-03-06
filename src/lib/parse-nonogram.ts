import pMap, { pMapSkip } from "p-map";
import { type Nonogram } from "./nonogram";
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
  const nonograms = await pMap(
    files,
    async (file) => {
      try {
        const nonogram = await parseNonogram(file);
        return nonogram;
      } catch {
        return pMapSkip;
      }
    },
    { concurrency: 8 },
  );
  return nonograms.sort((a, b) => a.timestamp.localeCompare(b.timestamp));
};
