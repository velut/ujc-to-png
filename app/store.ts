import { atom } from "jotai";

export const ujcFilesAtom = atom<File[]>([]);
export const nongramsAtom = atom([]);
export const loadingAtom = atom(false);
