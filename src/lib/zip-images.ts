import { BlobReader, BlobWriter, ZipWriter } from "@zip.js/zip.js";
import pMap, { pMapSkip } from "p-map";
import type { ImageFile } from "./create-image-files";

export async function zipImages(images: ImageFile[]): Promise<Blob> {
  const zip = new ZipWriter(new BlobWriter("application/zip"));
  await pMap(
    images,
    async (image) => {
      try {
        zip.add(image.file.name, new BlobReader(image.file));
      } catch {
        return pMapSkip;
      }
    },
    { concurrency: 8 },
  );
  return await zip.close();
}
