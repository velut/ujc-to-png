import { useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import { loadingAtom, processFilesAtom } from "../store/store";

export default function ConverterDropzone() {
  const isLoading = useAtomValue(loadingAtom);
  const processFiles = useSetAtom(processFilesAtom);
  const onDrop = useCallback(processFiles, [processFiles]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/octet-stream": [".ujc"],
      "image/png": [".png"],
    },
    disabled: isLoading,
  });

  return (
    <div>
      <h2>Dropzone</h2>
      <div
        {...getRootProps()}
        className={twMerge(
          "not-prose",
          "flex h-48 items-center justify-center rounded-xl border-2 border-dashed p-8 text-center",
          "border-gray-600 dark:border-gray-400",
          "bg-gray-100 dark:bg-gray-900"
        )}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <p className="motion-safe:animate-pulse text-balance">
            Processing nonograms, please wait...
          </p>
        ) : (
          <p className="text-balance">
            Drag and drop your nonograms here, or click to select{" "}
            <code className="font-mono">.ujc</code> or{" "}
            <code className="font-mono">.png</code> files.
          </p>
        )}
      </div>
    </div>
  );
}
