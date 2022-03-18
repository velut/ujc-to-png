export async function readFile(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reject(
        new Error(`readFile: error reading file ${file.name}: ${reader.error}`)
      );
    };
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      resolve(buffer);
    };
    reader.readAsArrayBuffer(file);
  });
}
