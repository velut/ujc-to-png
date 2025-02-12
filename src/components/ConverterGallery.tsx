import { BlobReader, BlobWriter, ZipWriter } from "@zip.js/zip.js";
import { saveAs } from "file-saver";
import { useAtomValue } from "jotai";
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
    if (count === 1) {
      const image = images[0];
      saveAs(image.file, image.file.name);
      return;
    }
    const zip = new ZipWriter(new BlobWriter("application/zip"));
    await Promise.all(
      images.map((image) =>
        zip.add(image.file.name, new BlobReader(image.file)),
      ),
    );
    const blob = await zip.close();
    saveAs(blob, "nonograms.zip");
  };

  return (
    <button
      className="not-prose my-8 flex h-16 w-full items-center justify-center rounded-xl text-lg font-bold enabled:bg-blue-600 enabled:text-white enabled:shadow hover:enabled:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-600"
      type="button"
      onClick={downloadImages}
      disabled={!enabled}
    >
      {enabled
        ? `Download ${count} ${count > 1 ? "images" : "image"}`
        : "Download"}
    </button>
  );
}

function GalleryImages() {
  const loading = useAtomValue(loadingAtom);
  const images = useAtomValue(imagesAtom);
  const hasImages = images.length > 0;

  return (
    <div className="not-prose flex items-center justify-center rounded-xl border-2 border-dashed border-gray-600 bg-gray-100 p-8 text-center dark:border-gray-400 dark:bg-gray-900">
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
        // "[image-rendering:pixelated]" to preserve pixelated look.
        // "bg-white" to add background color for transparent backgrounds.
        className="h-32 w-32 rounded border border-gray-200 bg-white object-contain shadow [image-rendering:pixelated] hover:border-gray-400 hover:shadow-lg dark:border-gray-800 dark:hover:border-gray-600"
        src={url}
        alt={filename}
      />
    </a>
  );
}
