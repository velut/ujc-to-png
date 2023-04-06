"use client";

import OptionsGridColor from "./OptionsGridColor";
import OptionsGridEnable from "./OptionsGridEnable";
import OptionsGridRadius from "./OptionsGridRadius";
import OptionsGridSize from "./OptionsGridSize";

export default function OptionsGrid() {
  return (
    <div className="space-y-4">
      <OptionsGridEnable />
      <OptionsGridSize />
      <OptionsGridColor />
      <OptionsGridRadius />
    </div>
  );
}
