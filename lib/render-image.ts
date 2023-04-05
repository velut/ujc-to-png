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
    enabled: boolean;
    size: number;
    color: string;
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
    image = await addGridToImage(image, scale, grid.size, grid.color);
  }

  return image;
};
