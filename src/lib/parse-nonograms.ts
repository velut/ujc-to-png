import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";
import pMap, { pMapSkip } from "p-map";
import { loadImage } from "./load-image";

export type Nonogram = {
  /** Base name (no file extension) of the ujc file containing the nonogram. */
  filename: string;

  /** Creation date timestamp in ISO 8601 format. */
  timestamp: string;

  /** Png image data extracted from the ujc file. */
  pngData: Blob;

  /** Nonogram's width in pixels. */
  width: number;

  /** Nonogram's height in pixels. */
  height: number;

  /** Title set by author (Not implemented). */
  title?: string;

  /** Alternative title set by author (Not implemented). */
  altTitle?: string;

  /** Author's username (Not implemented). */
  author?: string;
};

export async function parseNonograms(files: File[]): Promise<Nonogram[]> {
  return (
    await pMap(
      await getUjcFiles(files),
      async (file) => {
        try {
          return await parseNonogram(file);
        } catch {
          return pMapSkip;
        }
      },
      { concurrency: 8 },
    )
  ).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
}

async function getUjcFiles(files: File[]): Promise<File[]> {
  return (
    await pMap(
      files,
      async (file) => {
        try {
          const filename = file.name.toLowerCase();
          if (filename.endsWith(".ujc") || filename.endsWith(".png")) {
            return file;
          }
          if (filename.endsWith(".zip")) {
            return await unzipUjcFiles(file);
          }
          throw new Error(`unsupported file type: ${file.name}`);
        } catch {
          return pMapSkip;
        }
      },
      { concurrency: 8 },
    )
  ).flat();
}

async function unzipUjcFiles(file: File): Promise<File[]> {
  const reader = new ZipReader(new BlobReader(file));
  const entries = await reader.getEntries();
  const ujcEntries = entries.filter(({ filename }) =>
    filename.toLowerCase().endsWith(".ujc"),
  );
  return await pMap(
    ujcEntries,
    async (entry) => {
      try {
        const data = await entry.getData!(new BlobWriter());
        return new File([data], entry.filename.replace("MyNonograms/", ""));
      } catch {
        return pMapSkip;
      }
    },
    { concurrency: 8 },
  );
}

async function parseNonogram(file: File): Promise<Nonogram> {
  const buffer = await file.arrayBuffer();
  const filename = parseNonogramFilename(file.name);
  const timestamp = parseNonogramTimestamp(file.name);
  const pngData = parseNonogramPngData(buffer);
  const { width, height } = await parseNonogramDimensions(pngData);
  return { filename, timestamp, pngData, width, height };
}

function parseNonogramFilename(filename: string): string {
  return filename.trim().replace(".ujc", "").replace(".png", "");
}

function parseNonogramTimestamp(filename: string): string {
  // Regex to extract the timestamp from the filename.
  // Example of a ujc filename: `200131_123456_ABC.ujc`, that is, `yymmdd_hhmmss_RANDOM.ujc`.
  const timestampRegex =
    /^(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})/;
  const match = timestampRegex.exec(filename);
  if (!match || !match.groups) {
    // If the filename has no timestamp, return the current timestamp.
    return new Date().toISOString();
  }
  const { year, month, day, hour, minute, second } = match.groups;
  const date = new Date(
    `20${year}-${month}-${day}T${hour}:${minute}:${second}Z`,
  );
  return date.toISOString();
}

function parseNonogramPngData(buffer: ArrayBuffer): Blob {
  const data = new Uint8Array(buffer);
  for (let index = 0; index + 7 < data.length; index++) {
    if (isPngStart(data, index)) {
      return new Blob([data.subarray(index)]);
    }
  }
  throw new Error("buffer does not contain png data");
}

function isPngStart(data: Uint8Array, index: number) {
  // Png magic number is `89 50 4e 47 0d 0a 1a 0a`.
  // See https://en.wikipedia.org/wiki/PNG.
  return (
    data[index] === 0x89 &&
    data[index + 1] === 0x50 &&
    data[index + 2] === 0x4e &&
    data[index + 3] === 0x47 &&
    data[index + 4] === 0x0d &&
    data[index + 5] === 0x0a &&
    data[index + 6] === 0x1a &&
    data[index + 7] === 0x0a
  );
}

async function parseNonogramDimensions(
  blob: Blob,
): Promise<Pick<Nonogram, "width" | "height">> {
  const { width, height } = await loadImage(blob);
  return { width, height };
}
