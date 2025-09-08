import type { Image } from "./render-images";

export function revokeObjectUrls(images: Image[]) {
  const urls = images.map(({ url }) => url);

  // Let the browser render the new images before revoking the old ones.
  setTimeout(() => {
    for (const url of urls) {
      URL.revokeObjectURL(url);
    }
  }, 10_000);
}
