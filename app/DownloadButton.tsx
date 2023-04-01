"use client";

import { downloadZip } from "client-zip";
import { saveAs } from "file-saver";
import { useAtomValue } from "jotai";
import plur from "plur";
import { twMerge } from "tailwind-merge";
import { imagesAtom } from "./store";

export default function DownloadButton() {
  const images = useAtomValue(imagesAtom);
  const count = images.length;
  const downloadImages = async () => {
    const archive = await downloadZip(images.map((image) => image.file)).blob();
    saveAs(archive, "nonograms.zip");
  };

  return (
    <button
      className={twMerge(
        "not-prose",
        "my-8 flex h-16 w-full items-center justify-center rounded-xl text-lg font-bold shadow",
        "bg-blue-600",
        "hover:bg-blue-500",
        "text-white"
      )}
      type="button"
      onClick={downloadImages}
    >
      Download {count} {plur("image", count)}
    </button>
  );
}
