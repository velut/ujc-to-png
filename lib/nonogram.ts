export type Nonogram = {
  /** Title set by author. */
  title?: string;

  /** Alternative title set by author. */
  altTitle?: string;

  /** Author's username. */
  author?: string;

  /** Nonogram's width. */
  width?: number;

  /** Nonogram's height. */
  height?: number;

  /** Name of the ujc file containing the nonogram without the extension. */
  filename: string;

  /** Creation date timestamp in ISO 8601 format. */
  timestamp: string;

  /** Png file extracted from ujc file data. */
  pngData: Uint8Array;
};
