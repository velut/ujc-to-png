/* eslint-disable @next/next/no-img-element*/

"use client";

import { twMerge } from "tailwind-merge";

export default function GalleryImage({ image }: { image: File }) {
  const url = URL.createObjectURL(image);

  return (
    <div
      className={twMerge(
        "flex h-32 w-32 items-center justify-center rounded p-2",
        "bg-gray-300 dark:bg-gray-700"
      )}
    >
      <img
        className="pixel-art h-full w-full bg-white object-contain"
        src={url}
        alt=""
        onLoad={() => {
          URL.revokeObjectURL(url);
        }}
      />
    </div>
  );
}
