export interface Nonogram {
  /** Parsed nonogram file */
  pngFile: File;
  /** Object URL for image display */
  pngFileObjectUrl: string;
  /** Timestamp in ISO 8601 format for when the nonogram was created */
  timestamp: string;
  /** Name of the `.ujc` file created by Nonogram Katana */
  ujcFilename: string;

  // /** Name for the nonogram */
  // name?: string;
  // /** Alternative name for the nonogram */
  // altName?: string;
  // /** Name of the nonogram's author */
  // author?: string;
  // /** Nonogram width */
  // width?: number;
  // /** Nonogram height */
  // height?: number;
}

export async function parseNonograms(ujcFiles: File[]): Promise<Nonogram[]> {
  // Try to parse all nonograms from locally uploaded files
  const results = await Promise.allSettled(
    ujcFiles.map((ujcFile) => {
      return parseNonogram(ujcFile);
    })
  );

  // Keep only successfully parsed nonograms and order from oldest to newest
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
  // Names for `.ujc` files look like this `200131_123456_ABC.ujc`
  // or more generally `yymmdd_hhmmss_RAND.ujc`.
  const regex =
    /^(?<year>\d{2})(?<month>\d{2})(?<day>\d{2})_(?<hour>\d{2})(?<minute>\d{2})(?<second>\d{2})_/;
  const match = regex.exec(filename);
  if (!match || !match.groups) {
    // No timestamp in filename? Set creation time to now.
    return new Date().toISOString();
  }
  const year = `20${match.groups.year}`;
  const { month, day, hour, minute, second } = match.groups;
  const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}Z`);
  return date.toISOString();
}

async function readFile(file: File): Promise<Uint8Array> {
  // Read raw contents of locally uploaded file
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
  const pngBlob = await getPngBlob(ujcFilename, rawUjcData);
  const pngFilename = ujcFilename.replace(".ujc", ".png");
  return new File([pngBlob], pngFilename, {
    type: "image/png",
    lastModified: new Date(timestamp).getTime(),
  });
}

async function getPngBlob(
  ujcFilename: string,
  rawUjcData: Uint8Array
): Promise<Blob> {
  const start = findPngStartingPos(rawUjcData);
  if (!start) {
    throw new Error(`getPngBlob: no png data found in file ${ujcFilename}`);
  }
  const rawPngData = rawUjcData.subarray(start);
  const blob = await fixPng(rawPngData);
  return blob;
}

function findPngStartingPos(rawUjcData: Uint8Array): number | undefined {
  // Search for png header signature in the raw ujc data
  for (let index = 0; index < rawUjcData.length; index++) {
    // Last header index exceeds data length, stop searching
    if (index + 7 > rawUjcData.length - 1) {
      return undefined;
    }

    // Check png header/magic number
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

async function fixPng(rawPngData: Uint8Array): Promise<Blob> {
  // Get canvas and context
  const canvas = document.getElementById("work-canvas") as HTMLCanvasElement;
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;

  // Create image and wait until it's loaded
  const imageUrl = URL.createObjectURL(new Blob([rawPngData]));
  const image = new Image();
  image.src = imageUrl;
  await image.decode();

  // Resize canvas to fit image
  canvas.width = image.width;
  canvas.height = image.height;

  // Draw image on canvas and get pixel data
  context.drawImage(image, 0, 0);
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const pixelData = imageData.data;

  // The background color of colored nonograms is set with alpha = 128.
  // Reset every pixel to full alpha.
  // See https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
  for (let i = 0; i < pixelData.length; i += 4) {
    pixelData[i + 3] = 255;
  }

  // Replace image data and extract fixed image blob
  context.putImageData(imageData, 0, 0);
  const blob = await canvasToBlob(canvas);

  // Revoke temporary object url
  URL.revokeObjectURL(imageUrl);

  return blob;
}

async function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  // Promisify `canvas.toBlob`
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject("canvasToBlob: cannot transform canvas to blob");
          return;
        }
        resolve(blob);
      },
      "image/png",
      // Image quality (0 to 1)
      1.0
    );
  });
}
