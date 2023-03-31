import { recolorImage } from "./recolor-image";
import { scaleImage } from "./scale-image";

export type RenderImageOptions = {
  /* True if the images should be recolored (lossy operation). */
  recolor: boolean;

  /* Multiplier for scaling images (lossy operation). */
  scale: number;
};

export const renderImage = async (
  blob: Blob,
  { recolor, scale }: RenderImageOptions
): Promise<Blob> => {
  let image = blob;

  if (recolor) {
    image = await recolorImage(image);
  }

  if (scale > 1) {
    image = await scaleImage(image, scale);
  }

  return image;
};
