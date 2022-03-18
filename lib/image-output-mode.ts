export type ImageOutputMode =
  /** Png image as-is from ujc file */
  | "raw"
  /** Recolor, fixing transparent backgrounds, and scale by amount */
  | "recolor-scale-1"
  | "recolor-scale-2"
  | "recolor-scale-3"
  | "recolor-scale-4"
  | "recolor-scale-5"
  | "recolor-scale-10"
  | "recolor-scale-20"
  | "recolor-scale-25"
  | "recolor-scale-50"
  | "recolor-scale-75"
  | "recolor-scale-100";

export const imageOutputModes = [
  "raw",
  "recolor-scale-1",
  "recolor-scale-2",
  "recolor-scale-3",
  "recolor-scale-4",
  "recolor-scale-5",
  "recolor-scale-10",
  "recolor-scale-20",
  "recolor-scale-25",
  "recolor-scale-50",
  "recolor-scale-75",
  "recolor-scale-100",
] as const;

export function imageOutputModeScale(mode: ImageOutputMode): number {
  switch (mode) {
    case "raw":
    case "recolor-scale-1":
      return 1;
    case "recolor-scale-2":
      return 2;
    case "recolor-scale-3":
      return 3;
    case "recolor-scale-4":
      return 4;
    case "recolor-scale-5":
      return 5;
    case "recolor-scale-10":
      return 10;
    case "recolor-scale-20":
      return 20;
    case "recolor-scale-25":
      return 25;
    case "recolor-scale-50":
      return 50;
    case "recolor-scale-75":
      return 75;
    case "recolor-scale-100":
      return 100;
  }
}
