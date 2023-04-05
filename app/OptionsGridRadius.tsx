"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { useAtom } from "jotai";
import { ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";
import { renderOptionsAtom } from "./store";

export default function OptionsGridRadius() {
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
      <label
        className="block w-1/2 flex-none sm:w-1/4"
        title="Choose a radius to round the corners of pixels inside the grid."
        htmlFor="grid-radius-option"
      >
        Border radius
      </label>
      <input
        className={twMerge(
          "h-10 w-full rounded sm:w-1/4",
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
