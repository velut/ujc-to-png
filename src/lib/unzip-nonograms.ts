import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";

export async function unzipNonograms(file: File): Promise<File[]> {
  const reader = new ZipReader(new BlobReader(file));
  const entries = await reader.getEntries();
  const results = await Promise.allSettled(
    entries
      .filter((entry) => entry.filename.toLowerCase().endsWith(".ujc"))
      .map(async (entry) => {
        const data = await entry.getData!(new BlobWriter());
        return new File([data], entry.filename.replace("MyNonograms/", ""));
      }),
  );
  return results
    .filter((res) => res.status === "fulfilled")
    .map((res) => res.value);
}
