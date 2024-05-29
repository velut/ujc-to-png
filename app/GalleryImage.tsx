/* eslint-disable @next/next/no-img-element*/

"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function GalleryImage({ filename, url }: { filename: string; url: string }) {
	return (
		<Link href={url} target="_blank" title={filename}>
			<img
				className={twMerge(
					"pixelated h-32 w-32 rounded border object-contain shadow",
					"bg-white", // Background color for transparent backgrounds.
					"hover:shadow-lg",
					"border-gray-200 dark:border-gray-800",
					"hover:border-gray-400 dark:hover:border-gray-600",
				)}
				src={url}
				alt={filename}
			/>
		</Link>
	);
}
