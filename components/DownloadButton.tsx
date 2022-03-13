import { downloadZip } from "client-zip";
import { saveAs } from "file-saver";
import { nonogramsSelector, useStore } from "../lib/store";

export function DownloadButton() {
  const nonograms = useStore(nonogramsSelector);
  const downloadNonograms = async () => {
    const blob = await downloadZip(
      nonograms.map(({ pngFile }) => {
        return pngFile;
      })
    ).blob();
    saveAs(blob, "nonograms.zip");
  };

  return (
    <button
      className="rounded bg-blue-600  px-8 py-4 text-lg font-bold text-white shadow hover:bg-blue-500"
      onClick={downloadNonograms}
    >
      Download {nonograms.length} nonogram{nonograms.length > 1 && "s"}
    </button>
  );
}
