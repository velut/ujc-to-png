import { useDebouncedCallback } from "@react-hookz/web";
import { useAtom } from "jotai";
import { type ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";
import { renderOptionsAtom } from "../store/store";

export default function ConverterOptions() {
  return (
    <div>
      <h2>Options</h2>
      <div>
        <hr />
        <OptionsRecolor />
        <hr />
        <OptionsScale />
        <hr />
        <OptionsGrid />
        <hr />
      </div>
    </div>
  );
}

function OptionsRecolor() {
  const [renderOptions, setRenderOptions] = useAtom(renderOptionsAtom);
  const [inputValue, setInputValue] = useState(renderOptions.recolor);

  const setRecolor = useDebouncedCallback(
    (recolor: boolean) => {
      if (recolor !== renderOptions.recolor) {
        setRenderOptions({ ...renderOptions, recolor });
      }
    },
    [renderOptions, setRenderOptions],
    500
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const checked = event.target.checked;
    setInputValue(checked);
    setRecolor(checked);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="space-y-1 w-1/2 sm:w-96">
        <label htmlFor="recolor-option">Recolor images</label>
        <div className="text-sm">
          Fix transparent backgrounds in colored nonograms.
        </div>
      </div>
      <div>
        <input
          className="h-5 w-5 rounded dark:bg-gray-900"
          type="checkbox"
          name="recolor-option"
          id="recolor-option"
          checked={inputValue}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function OptionsScale() {
  const [renderOptions, setRenderOptions] = useAtom(renderOptionsAtom);
  const [inputValue, setInputValue] = useState(`${renderOptions.scale}`);

  const setScale = useDebouncedCallback(
    (scale: number) => {
      if (scale !== renderOptions.scale) {
        setRenderOptions({ ...renderOptions, scale });
      }
    },
    [renderOptions, setRenderOptions],
    500
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
    const maybeNumber = parseInt(event.target.value, 10);
    const scale = isNaN(maybeNumber) ? 1 : Math.max(1, maybeNumber);
    setScale(scale);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="space-y-1 w-1/2 sm:w-96">
        <label htmlFor="scale-option">Scale images</label>
        <div className="text-sm">
          Scale the original image dimensions by this value.
        </div>
      </div>
      <input
        className="h-10 rounded w-1/2 sm:w-1/4 dark:bg-gray-900"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        id="scale-option"
        name="scale-option"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}

function OptionsGrid() {
  return (
    <div className="space-y-8">
      <div className="text-center text-sm border p-4 rounded-xl border-gray-600 dark:border-gray-400 text-balance">
        Check out{" "}
        <a href="https://www.gridify.it" className="font-bold">
          gridify.it
        </a>{" "}
        if you need an image to grid generator with more options.
      </div>

      <div className="space-y-4">
        <OptionsGridEnable />
        <OptionsGridSize />
        <OptionsGridColor />
        <OptionsGridRadius />
      </div>
    </div>
  );
}

function OptionsGridEnable() {
  const [renderOptions, setRenderOptions] = useAtom(renderOptionsAtom);
  const [inputValue, setInputValue] = useState(renderOptions.grid.enabled);

  const setGridEnabled = useDebouncedCallback(
    (enabled: boolean) => {
      if (enabled !== renderOptions.grid.enabled) {
        setRenderOptions({
          ...renderOptions,
          grid: { ...renderOptions.grid, enabled },
        });
      }
    },
    [renderOptions, setRenderOptions],
    500
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const checked = event.target.checked;
    setInputValue(checked);
    setGridEnabled(checked);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="space-y-1 w-1/2 sm:w-96">
        <label htmlFor="grid-enabled-option">Grid lines</label>
        <div className="text-sm">
          Add grid lines between pixels for a stylized effect.
        </div>
      </div>
      <input
        className="h-5 w-5 rounded dark:bg-gray-900"
        type="checkbox"
        name="grid-enabled-option"
        id="grid-enabled-option"
        checked={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}

function OptionsGridSize() {
  const [renderOptions, setRenderOptions] = useAtom(renderOptionsAtom);
  const [inputValue, setInputValue] = useState(`${renderOptions.grid.size}`);

  const setGridSize = useDebouncedCallback(
    (size: number) => {
      if (size !== renderOptions.grid.size) {
        setRenderOptions({
          ...renderOptions,
          grid: { ...renderOptions.grid, size },
        });
      }
    },
    [renderOptions, setRenderOptions],
    500
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
    const maybeNumber = parseInt(event.target.value, 10);
    const size = isNaN(maybeNumber) ? 0 : Math.max(0, maybeNumber);
    setGridSize(size);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="space-y-1 w-1/2 sm:w-96">
        <label htmlFor="grid-size-option">Grid lines size</label>
        <div className="text-sm">Stroke size in pixels for the grid lines.</div>
      </div>
      <input
        className={twMerge(
          "h-10 w-1/2 rounded sm:w-1/4",
          "dark:bg-gray-900",
          "disabled:bg-gray-300 disabled:text-gray-400",
          "dark:disabled:bg-gray-700 dark:disabled:text-gray-600",
          "disabled:cursor-not-allowed"
        )}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        id="grid-size-option"
        name="grid-size-option"
        value={inputValue}
        onChange={handleChange}
        disabled={!renderOptions.grid.enabled}
      />
    </div>
  );
}

function OptionsGridColor() {
  const [renderOptions, setRenderOptions] = useAtom(renderOptionsAtom);
  const [inputValue, setInputValue] = useState(renderOptions.grid.color);

  const setGridColor = useDebouncedCallback(
    (color: string) => {
      if (color !== renderOptions.grid.color) {
        setRenderOptions({
          ...renderOptions,
          grid: { ...renderOptions.grid, color },
        });
      }
    },
    [renderOptions, setRenderOptions],
    500
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
    setGridColor(event.target.value);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="space-y-1 w-1/2 sm:w-96">
        <label htmlFor="grid-color-option">Grid lines color</label>
        <div className="text-sm">Pick a color for the grid lines.</div>
      </div>
      <input
        className={twMerge(
          "h-10 w-1/2 rounded sm:w-1/4",
          "dark:bg-gray-900",
          "disabled:bg-gray-300 disabled:text-gray-400",
          "dark:disabled:bg-gray-700 dark:disabled:text-gray-600",
          "disabled:cursor-not-allowed"
        )}
        type="color"
        id="grid-color-option"
        name="grid-color-option"
        value={inputValue}
        onChange={handleChange}
        disabled={!renderOptions.grid.enabled}
      />
    </div>
  );
}

function OptionsGridRadius() {
  const [renderOptions, setRenderOptions] = useAtom(renderOptionsAtom);
  const [inputValue, setInputValue] = useState(`${renderOptions.grid.radius}`);

  const setGridRadius = useDebouncedCallback(
    (radius: number) => {
      if (radius !== renderOptions.grid.radius) {
        setRenderOptions({
          ...renderOptions,
          grid: { ...renderOptions.grid, radius },
        });
      }
    },
    [renderOptions, setRenderOptions],
    500
  );

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.target.value);
    const maybeNumber = parseInt(event.target.value, 10);
    const radius = isNaN(maybeNumber) ? 0 : Math.max(0, maybeNumber);
    setGridRadius(radius);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="space-y-1 w-1/2 sm:w-96">
        <label htmlFor="grid-radius-option">Border radius</label>
        <div className="text-sm">
          Round the corners of pixels inside the grid.
        </div>
      </div>
      <input
        className={twMerge(
          "h-10 w-1/2 rounded sm:w-1/4",
          "dark:bg-gray-900",
          "disabled:bg-gray-300 disabled:text-gray-400",
          "dark:disabled:bg-gray-700 dark:disabled:text-gray-600",
          "disabled:cursor-not-allowed"
        )}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        id="grid-radius-option"
        name="grid-radius-option"
        value={inputValue}
        onChange={handleChange}
        disabled={!renderOptions.grid.enabled}
      />
    </div>
  );
}
