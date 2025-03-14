export async function loadImage(blob: Blob): Promise<HTMLImageElement> {
  const image = document.createElement("img");
  const url = URL.createObjectURL(blob);
  image.onload = () => {
    URL.revokeObjectURL(url);
  };
  image.src = url;
  await image.decode();
  return image;
}
