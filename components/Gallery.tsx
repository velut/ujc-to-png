import Image from "next/image";
import { nonogramsSelector, useStore } from "../lib/store";

export function Gallery() {
  const nonograms = useStore(nonogramsSelector);
  const hasNonograms = nonograms.length > 0;

  return (
    <div>
      {hasNonograms ? (
        <p>
          Found {nonograms.length} nonogram{nonograms.length > 1 && "s"}.
        </p>
      ) : (
        <p>No nonograms found, try selecting some files.</p>
      )}

      {hasNonograms && (
        <div className="mt-8 flex flex-wrap justify-center gap-8">
          {nonograms.map(({ filename, image }) => (
            <div key={filename}>
              {/* {JSON.stringify(nonogram, null, 2)} */}
              {image && (
                <div className="rounded border border-gray-500 p-4">
                  <Image
                    src={image}
                    alt=""
                    width={150}
                    height={150}
                    className="pixel-art object-contain"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
