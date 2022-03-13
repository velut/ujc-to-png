import { Nonogram } from "./parse-nonograms";

export function revokeNonogramObjectUrls(nonograms: Nonogram[]) {
  for (const { pngFileObjectUrl } of nonograms) {
    URL.revokeObjectURL(pngFileObjectUrl);
  }
}
