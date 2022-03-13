import create from "zustand";
import { Nonogram, parseNonograms } from "./parse-nonograms";
import { revokeNonogramObjectUrls } from "./revoke-nonogram-object-urls";

export interface StoreState {
  loading: boolean;
  nonograms: Nonogram[];
  setNonograms: (files: File[]) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  loading: false,
  nonograms: [],
  setNonograms: async (files) => {
    const oldNonograms = get().nonograms;
    set({ loading: true, nonograms: [] });
    const nonograms = await parseNonograms(files);
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

export const setNonogramsSelector = (state: StoreState) => {
  return state.setNonograms;
};
