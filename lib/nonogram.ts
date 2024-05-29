export type Nonogram = {
	/** Title set by author. */
	title?: string;

	/** Alternative title set by author. */
	altTitle?: string;

	/** Author's username. */
	author?: string;

	/** Base name (no file extension) of the ujc file containing the nonogram. */
	filename: string;

	/** Creation date timestamp in ISO 8601 format. */
	timestamp: string;

	/** Png image data extracted from ujc file data. */
	pngData: Blob;

	/** Nonogram's width in pixels. */
	width: number;

	/** Nonogram's height in pixels. */
	height: number;
};
