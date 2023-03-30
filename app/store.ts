import { atom } from "jotai";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const _ujcFilesAtom = atom<File[]>([]);

export const nongramsAtom = atom([]);
export const loadingAtom = atom(false);

export const ujcFilesAtom = atom(
  (get) => get(_ujcFilesAtom),
  async (get, set, files: File[]) => {
    set(loadingAtom, true);
    await sleep(5000);
    set(_ujcFilesAtom, files);
    set(loadingAtom, false);
  }
);
