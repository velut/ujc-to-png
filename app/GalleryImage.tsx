/* eslint-disable @next/next/no-img-element*/

"use client";

import { twMerge } from "tailwind-merge";

export default function GalleryImage({ image }: { image: File }) {
  const url = URL.createObjectURL(image);

  return (
    <img
      className={twMerge(
        "pixel-art h-32 w-32 rounded border object-contain shadow",
        "bg-white", // Background color for transparent backgrounds.
        "hover:shadow-lg",
        "border-gray-200 dark:border-gray-800",
        "hover:border-gray-400 dark:hover:border-gray-600"
      )}
      src={url}
      alt=""
      onLoad={() => {
        URL.revokeObjectURL(url);
      }}
    />
  );
}
