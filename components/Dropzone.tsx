import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { setNonogramsSelector, useStore } from "../lib/store";

export function Dropzone() {
  const setNonograms = useStore(setNonogramsSelector);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setNonograms(acceptedFiles);
    },
    [setNonograms]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".ujc",
  });

  return (
    <div
      {...getRootProps()}
      className="rounded-xl border-4 border-dashed border-blue-700 px-4 py-12 text-center"
    >
      <input {...getInputProps()} />
      <p className="text-lg">
        Drag and drop your nonograms here, or click to select{" "}
        <span className="font-mono">.ujc</span> files
      </p>
    </div>
  );
}
