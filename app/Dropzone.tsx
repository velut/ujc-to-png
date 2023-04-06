import dynamic from "next/dynamic";

const DropzoneClient = dynamic(() => import("./DropzoneClient"), {
  ssr: false,
});

export default function Dropzone() {
  return (
    <div>
      <h2>Dropzone</h2>
      <DropzoneClient />
    </div>
  );
}
