export async function writeCanvasToBlob(
  canvas: HTMLCanvasElement
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject("writeCanvasToBlob: cannot write canvas to blob");
          return;
        }
        resolve(blob);
      },
      "image/png",
      1.0
    );
  });
}
