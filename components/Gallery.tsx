import Image from "next/image";
import { loadingSelector, nonogramsSelector, useStore } from "../lib/store";
import { DownloadButton } from "./DownloadButton";

export function Gallery() {
  const loading = useStore(loadingSelector);
  const nonograms = useStore(nonogramsSelector);
  const hasNonograms = nonograms.length > 0;

  if (!loading && !hasNonograms) {
    return (
      <p className="mt-4">
        No nonograms found, try opening some{" "}
        <span className="font-mono">.ujc</span> files.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="mt-4 animate-pulse">Loading nonograms, please wait...</p>
    );
  }

  return (
    <>
      <div className="mt-8 flex justify-center">
        <DownloadButton />
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-8">
        {nonograms.map(({ ujcFilename, pngFile, pngFileObjectUrl }) => (
          <div key={ujcFilename} className="rounded border border-gray-500 p-4">
            <Image
              src={pngFileObjectUrl}
              alt={pngFile.name}
              width={100}
              height={100}
              className="pixel-art bg-white object-contain"
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <DownloadButton />
      </div>
    </>
  );
}
