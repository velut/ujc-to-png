import { atom } from "jotai";
import { Nonogram } from "../lib/nonogram";
import { parseNonograms } from "../lib/parse-nonogram";
import { RenderOptions } from "../lib/render-image";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const _loadingAtom = atom(false);
const _nonogramsAtom = atom<Nonogram[]>([]);
const _renderOptionsAtom = atom<RenderOptions>({
  recolor: false,
  scale: 1,
});
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
  const renderOptions = get(_renderOptionsAtom);
  set(_nonogramsAtom, nonograms);
  set(_imageFilesAtom, []);
  set(_loadingAtom, false);
});

export const renderOptionsAtom = atom(
  (get) => get(_renderOptionsAtom),
  async (get, set, renderOptions: RenderOptions) => {
    set(_loadingAtom, true);
    set(_imageFilesAtom, []);
    set(_renderOptionsAtom, renderOptions);
    const nonograms = get(_nonogramsAtom);
    set(_imageFilesAtom, []);
    set(_loadingAtom, false);
  }
);
