import { limit } from "./limit";
import { Nonogram } from "./nonogram";
import { RenderOptions, renderImage } from "./render-image";

export type ImageFile = {
  file: File;
  url: string;
};

const createImageFile = async (
  nonogram: Nonogram,
  renderOptions: RenderOptions
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
  renderOptions: RenderOptions
): Promise<ImageFile[]> => {
  return (
    await Promise.allSettled(
      nonograms.map((nonogram) =>
        limit(() => createImageFile(nonogram, renderOptions))
      )
    )
  )
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort((a, b) => a.file.lastModified - b.file.lastModified);
};
