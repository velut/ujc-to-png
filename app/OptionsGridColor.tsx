"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { useAtom } from "jotai";
import { ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";
import { renderOptionsAtom } from "./store";

export default function OptionsGridColor() {
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
      <label
        className="block w-1/2 flex-none sm:w-1/4"
        title="Pick a color for the grid lines."
        htmlFor="grid-color-option"
      >
        Grid lines color
      </label>
      <input
        className={twMerge(
          "h-10 w-full rounded sm:w-1/4",
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
