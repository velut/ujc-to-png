"use client";

import { useAtomValue } from "jotai";
import GalleryImage from "./GalleryImage";
import { imagesAtom, loadingAtom } from "./store";

export default function Gallery() {
  const loading = useAtomValue(loadingAtom);
  const images = useAtomValue(imagesAtom);
  const hasImages = images.length > 0;

  return (
    <>
      <h2>Gallery</h2>
      {loading ? (
        <p className="motion-safe:animate-pulse">
          Processing nonograms, please wait...
        </p>
      ) : !hasImages ? (
        <p>
          No nonograms found, try adding some <code>.ujc</code> files in the
          dropzone.
        </p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {images.map((image) => (
              <GalleryImage key={image.name} image={image} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
