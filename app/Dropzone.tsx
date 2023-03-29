"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";

export default function Dropzone() {
  //   const loading = useStore(loadingSelector);
  //   const setUjcFiles = useStore(setUjcFilesSelector);

  const isProcessing = false;
  const onDrop = useCallback(
    // (acceptedFiles: File[]) => setUjcFiles(acceptedFiles),
    // [setUjcFiles]
    (acceptedFiles: File[]) => {},
    []
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/octet-stream": [".ujc"],
      "image/png": [".png"],
    },
    disabled: isProcessing,
  });

  return (
    <>
      <h2>Dropzone</h2>
      <div
        {...getRootProps()}
        className={twMerge(
          "flex h-48 items-center justify-center rounded-xl border-2 border-dashed p-8 text-center",
          "border-gray-600 dark:border-gray-400",
          "bg-gray-100 dark:bg-gray-900"
        )}
      >
        <input {...getInputProps()} />
        {isProcessing ? (
          <p className="motion-safe:animate-pulse">
            Processing nonograms, please wait...
          </p>
        ) : (
          <p>
            Drag and drop your nonograms here, or click to select{" "}
            <code>.ujc</code> files.
          </p>
        )}
      </div>
    </>
  );
}
