import create from "zustand";
import { Nonogram, parseNonograms } from "./parse-nonograms";

export interface StoreState {
  nonograms: Nonogram[];
  setNonograms: (files: File[]) => void;
}

export const useStore = create<StoreState>((set) => ({
  nonograms: [],
  setNonograms: async (files) => {
    const nonograms = await parseNonograms(files);
    set({ nonograms });
  },
}));

export const nonogramsSelector = (state: StoreState) => state.nonograms;
export const setNonogramsSelector = (state: StoreState) => state.setNonograms;
