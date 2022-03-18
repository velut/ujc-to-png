import { readFile } from "./read-file";

export interface UjcFile {
  filename: string;
  timestamp: string;
  headerBlob: Blob;
  pngBlob: Blob;
}

export async function parseUjcFiles(files: File[]): Promise<UjcFile[]> {
  const results = await Promise.allSettled(
    files.map((file) => parseUjcFile(file))
  );

  // Keep only successfully parsed files and order from oldest to newest
  const parsedFiles = results
    .flatMap((result) => {
      if (result.status === "rejected") {
        return [];
      }
      return result.value;
    })
    .sort((a, b) => {
      return a.timestamp.localeCompare(b.timestamp);
    });
  return parsedFiles;
}

async function parseUjcFile(file: File): Promise<UjcFile> {
  const filename = file.name;
  const timestamp = parseUjcTimestamp(filename);
  const [headerBlob, pngBlob] = await parseUjcBlobs(file);
  return {
    filename,
    timestamp,
    headerBlob,
    pngBlob,
  };
}

function parseUjcTimestamp(filename: string): string {
  // Names for ujc files look like this `200131_123456_ABC.ujc`
  // or, more generally, `yymmdd_hhmmss_RANDOM.ujc`.
  const regex =
    /^(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})_/;
  const match = regex.exec(filename);
  if (!match || !match.groups) {
    // If no timestamp in filename, set to current time.
    return new Date().toISOString();
  }
  const year = `20${match.groups.year}`;
  const { month, day, hour, minute, second } = match.groups;
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  return date.toISOString();
}

async function parseUjcBlobs(file: File): Promise<Blob[]> {
  const buffer = await readFile(file);
  const data = new Uint8Array(buffer);
  const pngStart = findPngStartingPos(data);
  if (pngStart === undefined) {
    throw new Error(
      `parseUjcBlobs: file ${file.name} does not contain a png image`
    );
  }
  const headerBlob = new Blob([data.subarray(0, pngStart)]);
  const pngBlob = new Blob([data.subarray(pngStart)]);
  return [headerBlob, pngBlob];
}

function findPngStartingPos(data: Uint8Array): number | undefined {
  for (let index = 0; index < data.length; index++) {
    // Last header index exceeds data length, stop searching
    if (index + 7 > data.length - 1) {
      return undefined;
    }

    // Check png header/magic number
    if (
      data[index] === 0x89 &&
      data[index + 1] === 0x50 &&
      data[index + 2] === 0x4e &&
      data[index + 3] === 0x47 &&
      data[index + 4] === 0x0d &&
      data[index + 5] === 0x0a &&
      data[index + 6] === 0x1a &&
      data[index + 7] === 0x0a
    ) {
      return index;
    }
  }
  return undefined;
}
