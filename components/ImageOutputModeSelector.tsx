import clsx from "clsx";
import { ImageOutputMode, imageOutputModes } from "../lib/image-output-mode";
import {
  imageOutputModeSelector,
  loadingSelector,
  setImageOutputModeSelector,
  useStore,
} from "../lib/store";

export function ImageOutputModeSelector() {
  const loading = useStore(loadingSelector);
  const imageOutputMode = useStore(imageOutputModeSelector);
  const setImageOutputMode = useStore(setImageOutputModeSelector);

  return (
    <div className="mt-8 grid w-full grid-cols-1 border border-stone-500 sm:grid-cols-3">
      {imageOutputModes.map((mode, index) => (
        <button
          key={mode}
          className={clsx(
            "grow border border-stone-500 p-4",
            imageOutputMode === mode
              ? "bg-blue-600 font-bold text-white"
              : "hover:bg-stone-200 dark:hover:bg-stone-700"
          )}
          title={getImageOutputModeDescription(mode)}
          onClick={() => {
            setImageOutputMode(mode);
          }}
          disabled={loading}
        >
          {getImageOutputModeText(mode)}
        </button>
      ))}
    </div>
  );
}

function getImageOutputModeText(mode: ImageOutputMode): string {
  const recolorString = "Recolor images";
  const recolorAndScaleString = `Recolor and scale`;
  switch (mode) {
    case "raw":
      return "Raw images";
    case "recolor-scale-1":
      return recolorString;
    case "recolor-scale-2":
      return `${recolorAndScaleString} 2x`;
    case "recolor-scale-3":
      return `${recolorAndScaleString} 3x`;
    case "recolor-scale-4":
      return `${recolorAndScaleString} 4x`;
    case "recolor-scale-5":
      return `${recolorAndScaleString} 5x`;
    case "recolor-scale-10":
      return `${recolorAndScaleString} 10x`;
    case "recolor-scale-20":
      return `${recolorAndScaleString} 20x`;
    case "recolor-scale-25":
      return `${recolorAndScaleString} 25x`;
    case "recolor-scale-50":
      return `${recolorAndScaleString} 50x`;
    case "recolor-scale-75":
      return `${recolorAndScaleString} 75x`;
    case "recolor-scale-100":
      return `${recolorAndScaleString} 100x`;
  }
}

function getImageOutputModeDescription(mode: ImageOutputMode): string {
  const recolorAndScaleString = `Recolor images to fix transparent background colors and scale width and height by`;
  switch (mode) {
    case "raw":
      return "Extract images as-is with no additional processing";
    case "recolor-scale-1":
      return "Recolor images to fix transparent background colors; due to the way that browsers work, this is a lossy operation and some colors may differ from the original ones";
    case "recolor-scale-2":
      return `${recolorAndScaleString} 2`;
    case "recolor-scale-3":
      return `${recolorAndScaleString} 3`;
    case "recolor-scale-4":
      return `${recolorAndScaleString} 4`;
    case "recolor-scale-5":
      return `${recolorAndScaleString} 5`;
    case "recolor-scale-10":
      return `${recolorAndScaleString} 10`;
    case "recolor-scale-20":
      return `${recolorAndScaleString} 20`;
    case "recolor-scale-25":
      return `${recolorAndScaleString} 25`;
    case "recolor-scale-50":
      return `${recolorAndScaleString} 50`;
    case "recolor-scale-75":
      return `${recolorAndScaleString} 75`;
    case "recolor-scale-100":
      return `${recolorAndScaleString} 100`;
  }
}
