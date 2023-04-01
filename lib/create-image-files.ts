import { Nonogram } from "./nonogram";
import { RenderOptions, renderImage } from "./render-image";

const createImageFile = async (
  nonogram: Nonogram,
  renderOptions: RenderOptions
) => {
  const image = await renderImage(nonogram.pngData, renderOptions);
  return new File([image], `${nonogram.filename}.png`, {
    type: "image/png",
    lastModified: new Date(nonogram.timestamp).getTime(),
  });
};

export const createImageFiles = async (
  nonograms: Nonogram[],
  renderOptions: RenderOptions
): Promise<File[]> => {
  return (
    await Promise.allSettled(
      nonograms.map((nonogram) => createImageFile(nonogram, renderOptions))
    )
  )
    .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
    .sort((a, b) => a.lastModified - b.lastModified);
};
