export interface Nonogram {
  /** Name of the `.ujc` file created by Nonogram Katana */
  filename: string;
  /** Name for the nonogram in english */
  englishName?: string;
  /** Name for the nonogram in the author's local language */
  localName?: string;
  /** Name of the nonogram's author */
  author?: string;
  /** Timestamp in ISO 8601 format for when the nonogram was created */
  timestamp?: string;
  /** Nonogram picture */
  image?: string;
  /** Nonogram width */
  width?: number;
  /** Nonogram height */
  height?: number;
}

export async function parseNonograms(files: File[]): Promise<Nonogram[]> {
  return Promise.all(
    files.map((file) => {
      return parseNonogram(file);
    })
  );
}

async function parseNonogram(file: File): Promise<Nonogram> {
  const filename = file.name;
  const timestamp = parseTimestamp(filename);
  const contents = await readFile(file);
  const image = await parsePng(contents);
  return {
    filename,
    // englishName,
    // localName,
    // author,
    timestamp,
    image,
    // width,
    // height,
  };
}

function parseTimestamp(filename: string): string | undefined {
  const regex =
    /^(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})_/;
  const match = regex.exec(filename);
  if (!match || !match.groups) {
    return undefined;
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

async function parsePng(contents: Uint8Array): Promise<string | undefined> {
  const start = findPngStartingPos(contents);
  if (!start) {
    return undefined;
  }
  const pngData = contents.subarray(start);
  const pngDataURL = await readAsPngDataURL(pngData);
  return pngDataURL;
}

function findPngStartingPos(contents: Uint8Array): number | undefined {
  for (let index = 0; index < contents.length; index++) {
    if (index + 8 > contents.length) {
      return undefined;
    }
    // Check Png magic number
    if (
      contents[index] === 0x89 &&
      contents[index + 1] === 0x50 &&
      contents[index + 2] === 0x4e &&
      contents[index + 3] === 0x47 &&
      contents[index + 4] === 0x0d &&
      contents[index + 5] === 0x0a &&
      contents[index + 6] === 0x1a &&
      contents[index + 7] === 0x0a
    ) {
      return index;
    }
  }
}

async function readAsPngDataURL(pngData: Uint8Array): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reject(
        new Error(`readAsPngDataURL: error reading data: ${reader.error}`)
      );
    };
    reader.onload = () => {
      const dataURL = reader.result as string;
      const pngDataURL = dataURL.replace(
        "data:application/octet-stream;base64,",
        "data:image/png;base64,"
      );
      resolve(pngDataURL);
    };
    reader.readAsDataURL(new Blob([pngData]));
  });
}
