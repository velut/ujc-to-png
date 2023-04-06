import dynamic from "next/dynamic";

const DownloadButton = dynamic(() => import("./DownloadButton"), {
  ssr: false,
});

const GalleryClient = dynamic(() => import("./GalleryClient"), {
  ssr: false,
});

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
