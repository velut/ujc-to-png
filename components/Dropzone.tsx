import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { loadingSelector, setNonogramsSelector, useStore } from "../lib/store";

export function Dropzone() {
  const loading = useStore(loadingSelector);
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
    disabled: loading,
  });

  return (
    <div
      {...getRootProps()}
      className="rounded-xl border-2 border-dashed border-gray-500 bg-gray-200 px-4 py-12 text-center dark:bg-stone-700"
    >
      <input {...getInputProps()} />
      {loading ? (
        <p className="animate-pulse text-lg">
          Loading nonograms, please wait...
        </p>
      ) : (
        <p className="text-lg">
          Drag and drop your nonograms here, or click to select{" "}
          <span className="font-mono">.ujc</span> files
        </p>
      )}
    </div>
  );
}
