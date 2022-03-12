import { nonogramsSelector, useStore } from "../lib/store";

export function Gallery() {
  const nonograms = useStore(nonogramsSelector);

  return (
    <div className="rounded-xl border-4 border-dashed border-sky-500 p-6 text-center">
      Gallery
      <ul>
        {nonograms.map((nonogram) => (
          <li key={nonogram.filename}>
            {JSON.stringify(nonogram, null, 2)}
            {nonogram.image && (
              //   <Image src={nonogram.image} alt="" width={500} height={500} />
              <img
                src={nonogram.image}
                alt=""
                width={500}
                height={500}
                className="pixel-art"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
