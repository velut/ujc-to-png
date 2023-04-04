"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { useAtom } from "jotai";
import { ChangeEventHandler, useState } from "react";
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
        className="flex w-40 flex-none items-center gap-1"
        title="Pick a color for the grid lines."
        htmlFor="grid-color-option"
      >
        Grid color <div className="text-sm">(?)</div>
      </label>
      <input
        className="h-10 w-48 rounded"
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
