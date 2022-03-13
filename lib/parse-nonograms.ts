export interface Nonogram {
  /** Parsed nonogram file */
  pngFile: File;
  /** Object URL for image display */
  pngFileObjectUrl: string;
  /** Timestamp in ISO 8601 format for when the nonogram was created */
  timestamp: string;
  /** Name of the `.ujc` file created by Nonogram Katana */
  ujcFilename: string;

  /** Name for the nonogram */
  name?: string;
  /** Alternative name for the nonogram */
  altName?: string;
  /** Name of the nonogram's author */
  author?: string;
  /** Nonogram width */
  width?: number;
  /** Nonogram height */
  height?: number;
}

export async function parseNonograms(ujcFiles: File[]): Promise<Nonogram[]> {
  const results = await Promise.allSettled(
    ujcFiles.map((ujcFile) => {
      return parseNonogram(ujcFile);
    })
  );
  const nonograms = results
    .flatMap((result) => {
      if (result.status === "rejected") {
        return [];
      }
      return result.value;
    })
    .sort((a, b) => {
      return a.timestamp.localeCompare(b.timestamp);
    });
  return nonograms;
}

async function parseNonogram(ujcFile: File): Promise<Nonogram> {
  const ujcFilename = ujcFile.name;
  const timestamp = parseTimestamp(ujcFilename);
  const rawUjcData = await readFile(ujcFile);
  const pngFile = await parsePngFile(ujcFilename, rawUjcData, timestamp);
  const pngFileObjectUrl = URL.createObjectURL(pngFile);
  return {
    pngFile,
    pngFileObjectUrl,
    timestamp,
    ujcFilename,
  };
}

function parseTimestamp(filename: string): string {
  const regex =
    /^(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})_/;
  const match = regex.exec(filename);
  if (!match || !match.groups) {
    return new Date().toISOString();
  }
  const year = `20${match.groups.year}`;
  const { month, day, hour, minute, second } = match.groups;
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  return date.toISOString();
}

async function readFile(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reject(
        new Error(`readFile: error reading file ${file.name}: ${reader.error}`)
      );
    };
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      const data = new Uint8Array(buffer);
      resolve(data);
    };
    reader.readAsArrayBuffer(file);
  });
}

async function parsePngFile(
  ujcFilename: string,
  rawUjcData: Uint8Array,
  timestamp: string
): Promise<File> {
  const data = await extractPngData(rawUjcData);
  if (!data) {
    throw new Error(`parsePngFile: no png data found in file ${ujcFilename}`);
  }
  const pngFilename = ujcFilename.replace(".ujc", ".png");
  return new File([data], pngFilename, {
    type: "image/png",
    lastModified: new Date(timestamp).getTime(),
  });
}

async function extractPngData(
  rawUjcData: Uint8Array
): Promise<Uint8Array | undefined> {
  const start = findPngStartingPos(rawUjcData);
  if (!start) {
    return undefined;
  }
  return rawUjcData.subarray(start);
}

function findPngStartingPos(rawUjcData: Uint8Array): number | undefined {
  for (let index = 0; index < rawUjcData.length; index++) {
    // Last index exceeds data length, stop searching
    if (index + 7 > rawUjcData.length - 1) {
      return undefined;
    }
    // Check Png magic number
    if (
      rawUjcData[index] === 0x89 &&
      rawUjcData[index + 1] === 0x50 &&
      rawUjcData[index + 2] === 0x4e &&
      rawUjcData[index + 3] === 0x47 &&
      rawUjcData[index + 4] === 0x0d &&
      rawUjcData[index + 5] === 0x0a &&
      rawUjcData[index + 6] === 0x1a &&
      rawUjcData[index + 7] === 0x0a
    ) {
      return index;
    }
  }
  return undefined;
}
