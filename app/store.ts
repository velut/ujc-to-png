import { atom } from "jotai";
import { ImageFile, createImageFiles } from "../lib/create-image-files";
import { Nonogram } from "../lib/nonogram";
import { parseNonograms } from "../lib/parse-nonogram";
import { RenderOptions } from "../lib/render-image";
import { revokeObjectUrls } from "../lib/revoke-object-urls";

const _loadingAtom = atom(false);
const _nonogramsAtom = atom<Nonogram[]>([]);
const _renderOptionsAtom = atom<RenderOptions>({
  recolor: false,
  scale: 1,
});
const _imagesAtom = atom<ImageFile[]>([]);

export const loadingAtom = atom((get) => get(_loadingAtom));
export const nonogramsAtom = atom((get) => get(_nonogramsAtom));
export const imagesAtom = atom((get) => get(_imagesAtom));

export const processFilesAtom = atom(null, async (get, set, files: File[]) => {
  set(_loadingAtom, true);
  set(_nonogramsAtom, []);
  const oldImages = get(_imagesAtom);
  set(_imagesAtom, []);
  revokeObjectUrls(oldImages);
  const nonograms = await parseNonograms(files);
  const renderOptions = get(_renderOptionsAtom);
  const images = await createImageFiles(nonograms, renderOptions);
  set(_nonogramsAtom, nonograms);
  set(_imagesAtom, images);
  set(_loadingAtom, false);
});

export const renderOptionsAtom = atom(
  (get) => get(_renderOptionsAtom),
  async (get, set, renderOptions: RenderOptions) => {
    set(_loadingAtom, true);
    const oldImages = get(_imagesAtom);
    set(_imagesAtom, []);
    revokeObjectUrls(oldImages);
    set(_renderOptionsAtom, renderOptions);
    const nonograms = get(_nonogramsAtom);
    const images = await createImageFiles(nonograms, renderOptions);
    set(_imagesAtom, images);
    set(_loadingAtom, false);
  }
);
