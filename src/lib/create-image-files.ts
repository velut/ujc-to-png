import pMap, { pMapSkip } from "p-map";
import { type Nonogram } from "./nonogram";
import { type RenderOptions, renderImage } from "./render-image";

export type ImageFile = {
  file: File;
  url: string;
};

const createImageFile = async (
  nonogram: Nonogram,
  renderOptions: RenderOptions,
): Promise<ImageFile> => {
  const image = await renderImage(nonogram.pngData, renderOptions);
  const file = new File([image], `${nonogram.filename}.png`, {
    type: "image/png",
    lastModified: new Date(nonogram.timestamp).getTime(),
  });
  const url = URL.createObjectURL(file);
  return { file, url };
};

export const createImageFiles = async (
  nonograms: Nonogram[],
  renderOptions: RenderOptions,
): Promise<ImageFile[]> => {
  const images = await pMap(
    nonograms,
    async (nonogram) => {
      try {
        const imageFile = await createImageFile(nonogram, renderOptions);
        return imageFile;
      } catch {
        return pMapSkip;
      }
    },
    { concurrency: 8 },
  );
  return images.sort((a, b) => a.file.lastModified - b.file.lastModified);
};
