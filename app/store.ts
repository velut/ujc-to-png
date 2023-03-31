import { atom } from "jotai";
import { Nonogram } from "../lib/nonogram";
import { parseNonograms } from "../lib/parse-nonogram";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const _loadingAtom = atom(false);
const _nonogramsAtom = atom<Nonogram[]>([]);
const _renderOptionsAtom = atom({ recolor: false, scale: 1 });
const _imageFilesAtom = atom<File[]>([]);

export const loadingAtom = atom((get) => get(_loadingAtom));
export const nonogramsAtom = atom((get) => get(_nonogramsAtom));
export const hasNonogramsAtom = atom((get) => get(nonogramsAtom).length > 0);
export const imageFilesAtom = atom((get) => get(_imageFilesAtom));

export const processFilesAtom = atom(null, async (get, set, files: File[]) => {
  set(_loadingAtom, true);
  set(_nonogramsAtom, []);
  set(_imageFilesAtom, []);
  const nonograms = await parseNonograms(files);
  const renderOptions = get(renderOptionsAtom);
  set(_nonogramsAtom, nonograms);
  set(_imageFilesAtom, []);
  set(_loadingAtom, false);
});

export const renderOptionsAtom = atom((get) => get(_renderOptionsAtom));
