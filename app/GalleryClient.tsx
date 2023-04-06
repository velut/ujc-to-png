"use client";

import { useAtomValue } from "jotai";
import { twMerge } from "tailwind-merge";
import GalleryImage from "./GalleryImage";
import { imagesAtom, loadingAtom } from "./store";

export default function GalleryClient() {
  const loading = useAtomValue(loadingAtom);
  const images = useAtomValue(imagesAtom);
  const hasImages = images.length > 0;

  return (
    <div
      className={twMerge(
        "not-prose",
        "flex items-center justify-center rounded-xl border-2 border-dashed p-8 text-center",
        "border-gray-600 dark:border-gray-400",
        "bg-gray-100 dark:bg-gray-900"
      )}
    >
      {loading ? (
        <p className="motion-safe:animate-pulse">
          Processing nonograms, please wait...
        </p>
      ) : !hasImages ? (
        <p>No nonograms found, try adding some files in the dropzone above.</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-6">
          {images.map((image) => (
            <GalleryImage
              key={image.file.name}
              filename={image.file.name}
              url={image.url}
            />
          ))}
        </div>
      )}
    </div>
  );
}
