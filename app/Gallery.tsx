import DownloadButton from "./DownloadButton";
import GalleryClient from "./GalleryClient";

export default function Gallery() {
  return (
    <div>
      <h2>Gallery</h2>
      <DownloadButton />
      <GalleryClient />
      <DownloadButton />
    </div>
  );
}
