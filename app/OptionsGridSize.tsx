"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { useAtom } from "jotai";
import { ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";
import { renderOptionsAtom } from "./store";

export default function OptionsGridSize() {
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
    const size = isNaN(maybeNumber) ? 1 : Math.max(1, maybeNumber);
    setGridSize(size);
  };

  return (
    <div className="flex items-center gap-2">
      <label
        className="flex w-40 flex-none items-center gap-1"
        title="Choose a size in pixels for the grid lines."
        htmlFor="grid-size-option"
      >
        Grid lines size <div className="text-sm">(?)</div>
      </label>
      <input
        className={twMerge("rounded", "dark:bg-gray-900")}
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
