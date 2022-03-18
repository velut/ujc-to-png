import create from "zustand";
import { ImageOutputMode } from "./image-output-mode";
import { Nonogram, parseNonograms } from "./parse-nonograms";
import { parseUjcFiles, UjcFile } from "./parse-ujc-files";
import { revokeNonogramObjectUrls } from "./revoke-nonogram-object-urls";

export interface StoreState {
  ujcFiles: UjcFile[];
  nonograms: Nonogram[];
  loading: boolean;
  imageOutputMode: ImageOutputMode;
  setUjcFiles: (files: File[]) => Promise<void>;
  setImageOutputMode: (mode: ImageOutputMode) => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  ujcFiles: [],
  nonograms: [],
  loading: false,
  imageOutputMode: "raw",
  setUjcFiles: async (files) => {
    const oldNonograms = get().nonograms;
    const mode = get().imageOutputMode;
    set({ loading: true, ujcFiles: [], nonograms: [] });
    const ujcFiles = await parseUjcFiles(files);
    const nonograms = await parseNonograms(ujcFiles, mode);
    set({ loading: false, ujcFiles, nonograms });
    setTimeout(() => {
      revokeNonogramObjectUrls(oldNonograms);
    }, 100);
  },
  setImageOutputMode: async (mode) => {
    const oldNonograms = get().nonograms;
    const ujcFiles = get().ujcFiles;
    set({ loading: true, nonograms: [], imageOutputMode: mode });
    const nonograms = await parseNonograms(ujcFiles, mode);
    set({ loading: false, nonograms });
    setTimeout(() => {
      revokeNonogramObjectUrls(oldNonograms);
    }, 100);
  },
}));

export const loadingSelector = (state: StoreState) => {
  return state.loading;
};

export const nonogramsSelector = (state: StoreState) => {
  return state.nonograms;
};

export const imageOutputModeSelector = (state: StoreState) => {
  return state.imageOutputMode;
};

export const setUjcFilesSelector = (state: StoreState) => {
  return state.setUjcFiles;
};

export const setImageOutputModeSelector = (state: StoreState) => {
  return state.setImageOutputMode;
};
