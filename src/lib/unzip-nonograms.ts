import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";
import pMap, { pMapSkip } from "p-map";

export async function unzipNonograms(file: File): Promise<File[]> {
  const reader = new ZipReader(new BlobReader(file));
  const entries = await reader.getEntries();
  const ujcEntries = entries.filter(({ filename }) =>
    filename.toLowerCase().endsWith(".ujc"),
  );
  return pMap(
    ujcEntries,
    async (entry) => {
      try {
        const data = await entry.getData!(new BlobWriter());
        return new File([data], entry.filename.replace("MyNonograms/", ""));
      } catch {
        return pMapSkip;
      }
    },
    { concurrency: 8 },
  );
}
