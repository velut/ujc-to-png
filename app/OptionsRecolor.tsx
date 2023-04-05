"use client";

import { useDebouncedCallback } from "@react-hookz/web";
import { useAtom } from "jotai";
import { ChangeEventHandler, useState } from "react";
import { twMerge } from "tailwind-merge";
import { renderOptionsAtom } from "./store";

export default function OptionsRecolor() {
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
      <label
        className="block w-1/2 sm:w-1/4"
        title="Change the original colors to fix transparent backgrounds in colored nonograms."
        htmlFor="recolor-option"
      >
        Recolor images
      </label>
      <input
        className={twMerge("h-5 w-5 rounded", "dark:bg-gray-900")}
        type="checkbox"
        name="recolor-option"
        id="recolor-option"
        checked={inputValue}
        onChange={handleChange}
      />
    </div>
  );
}
