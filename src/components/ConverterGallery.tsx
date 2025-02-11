import { downloadZip } from "client-zip";
import { saveAs } from "file-saver";
import { useAtomValue } from "jotai";
import plur from "plur";
import { twMerge } from "tailwind-merge";
import { imagesAtom, loadingAtom } from "../store/store";

export default function ConverterGallery() {
  return (
    <div>
      <h2>Gallery</h2>
      <DownloadButton />
      <GalleryImages />
      <DownloadButton />
    </div>
  );
}

function DownloadButton() {
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
        "disabled:cursor-not-allowed",
      )}
      type="button"
      onClick={downloadImages}
      disabled={!enabled}
    >
      {enabled ? `Download ${count} ${plur("image", count)}` : "Download"}
    </button>
  );
}

function GalleryImages() {
  const loading = useAtomValue(loadingAtom);
  const images = useAtomValue(imagesAtom);
  const hasImages = images.length > 0;

  return (
    <div
      className={twMerge(
        "not-prose",
        "flex items-center justify-center rounded-xl border-2 border-dashed p-8 text-center",
        "border-gray-600 dark:border-gray-400",
        "bg-gray-100 dark:bg-gray-900",
      )}
    >
      {loading ? (
        <p className="text-balance motion-safe:animate-pulse">
          Processing nonograms, please wait...
        </p>
      ) : !hasImages ? (
        <p className="text-balance">
          No nonograms found, try adding some files in the dropzone above.
        </p>
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

function GalleryImage({ filename, url }: { filename: string; url: string }) {
  return (
    <a href={url} target="_blank" title={filename}>
      <img
        className={twMerge(
          "[image-rendering:pixelated]", // Preserve pixelated look.
          "h-32 w-32 rounded border object-contain shadow",
          "bg-white", // Background color for transparent backgrounds.
          "hover:shadow-lg",
          "border-gray-200 dark:border-gray-800",
          "hover:border-gray-400 dark:hover:border-gray-600",
        )}
        src={url}
        alt={filename}
      />
    </a>
  );
}
