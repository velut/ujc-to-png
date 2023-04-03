"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { useAtom } from "jotai";
import { ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";
import { renderOptionsAtom } from "./store";

export default function OptionsGridEnable() {
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
      <label
        className="flex w-40 flex-none items-center gap-1"
        title="Enable grid lines between pixels in the image for a stylized effect."
        htmlFor="grid-enabled-option"
      >
        Grid lines <div className="text-sm">(?)</div>
      </label>
      <input
        className={twMerge("h-5 w-5 rounded", "dark:bg-gray-900")}
        type="checkbox"
        name="grid-enabled-option"
        id="grid-enabled-option"
        checked={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
