const isPngStart = (data: Uint8Array, index: number) => {
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
};

export const parsePngData = (buffer: ArrayBuffer): Uint8Array => {
  const data = new Uint8Array(buffer);
  for (let index = 0; index + 7 < data.length; index++) {
    if (isPngStart(data, index)) {
      return data.subarray(index);
    }
  }
  throw new Error("parsePngData: buffer does not contain png data");
};
