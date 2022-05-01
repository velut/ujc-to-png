import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { loadingSelector, setUjcFilesSelector, useStore } from "../lib/store";

export function Dropzone() {
  const loading = useStore(loadingSelector);
  const setUjcFiles = useStore(setUjcFilesSelector);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => setUjcFiles(acceptedFiles),
    [setUjcFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/octet-stream": [".ujc"],
    },
    disabled: loading,
  });

  return (
    <div
      {...getRootProps()}
      className="rounded-xl border-2 border-dashed border-stone-500 bg-stone-200 px-4 py-12 text-center dark:bg-stone-700"
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
