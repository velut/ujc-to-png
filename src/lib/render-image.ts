import { addGridToImage } from "./add-grid-to-image";
import { recolorImage } from "./recolor-image";
import { scaleImage } from "./scale-image";

export type RenderOptions = {
  /* True if the images should be recolored (lossy operation). */
  recolor: boolean;

  /* Multiplier for scaling images (lossy operation). */
  scale: number;

  /* Style images by adding pixel grid lines (lossy operation). */
  grid: {
    /* True if the grid should be enabled. */
    enabled: boolean;

    /* Stroke size in pixels for grid lines. */
    size: number;

    /* Stroke color in hex format for grid lines. */
    color: string;

    /* Radius for rounding borders of original pixels. */
    radius: number;
  };
};

export const renderImage = async (
  blob: Blob,
  { recolor, scale, grid }: RenderOptions
): Promise<Blob> => {
  let image = blob;

  if (recolor) {
    image = await recolorImage(image);
  }

  if (scale > 1 && !grid.enabled) {
    image = await scaleImage(image, scale);
  }

  if (grid.enabled) {
    image = await addGridToImage(
      image,
      scale,
      grid.size,
      grid.color,
      grid.radius
    );
  }

  return image;
};
