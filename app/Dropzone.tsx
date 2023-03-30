"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { loadingAtom, ujcFilesAtom } from "./store";

export default function Dropzone() {
  const isLoading = useAtomValue(loadingAtom);
  const setUjcFiles = useSetAtom(ujcFilesAtom);
  const onDrop = useCallback(setUjcFiles, [setUjcFiles]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/octet-stream": [".ujc"],
      "image/png": [".png"],
    },
    disabled: isLoading,
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
        {isLoading ? (
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
