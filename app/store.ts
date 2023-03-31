import { atom } from "jotai";
import { Nonogram } from "../lib/nonogram";
import { parseNonograms } from "../lib/parse-nonogram";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadingAtom = atom(false);
export const nonogramsAtom = atom<Nonogram[]>([]);

export const hasNonogramsAtom = atom((get) => get(nonogramsAtom).length > 0);

export const processFilesAtom = atom(null, async (get, set, files: File[]) => {
  set(loadingAtom, true);
  set(nonogramsAtom, []);
  const nonograms = await parseNonograms(files);
  set(nonogramsAtom, nonograms);
  set(loadingAtom, false);
});
