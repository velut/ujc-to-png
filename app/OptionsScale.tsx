"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { useAtom } from "jotai";
import { ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";
import { renderOptionsAtom } from "./store";

export default function OptionsScale() {
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
      <label
        className="block w-1/2 flex-none sm:w-1/4"
        title="Scale the original image dimensions by this multiplier value."
        htmlFor="scale-option"
      >
        Scale images
      </label>
      <input
        className={twMerge("h-10 w-full rounded sm:w-1/4", "dark:bg-gray-900")}
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
