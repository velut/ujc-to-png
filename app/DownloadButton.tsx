"use client";

import { downloadZip } from "client-zip";
import { saveAs } from "file-saver";
import { useAtomValue } from "jotai";
import plur from "plur";
import { twMerge } from "tailwind-merge";
import { imagesAtom, loadingAtom } from "./store";

export default function DownloadButton() {
  const loading = useAtomValue(loadingAtom);
  const images = useAtomValue(imagesAtom);
  const count = images.length;
  const hasImages = images.length > 0;
  const enabled = !loading && hasImages;

  const downloadImages = async () => {
    const archive = await downloadZip(images.map((image) => image.file)).blob();
    saveAs(archive, "nonograms.zip");
  };

  return (
    <button
      className={twMerge(
        "not-prose",
        "my-8 flex h-16 w-full items-center justify-center rounded-xl text-lg font-bold",
        "enabled:bg-blue-600 enabled:text-white enabled:shadow",
        "hover:enabled:bg-blue-500",
        "disabled:bg-gray-300 disabled:text-gray-400",
        "dark:disabled:bg-gray-700 dark:disabled:text-gray-600",
        "disabled:cursor-not-allowed"
      )}
      type="button"
      onClick={downloadImages}
      disabled={!enabled}
    >
      {enabled ? `Download ${count} ${plur("image", count)}` : "Download"}
    </button>
  );
}
