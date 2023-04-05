import OptionsGridColor from "./OptionsGridColor";
import OptionsGridEnable from "./OptionsGridEnable";
import OptionsGridSize from "./OptionsGridSize";

export default function OptionsGrid() {
  return (
    <div className="space-y-4">
      <OptionsGridEnable />
      <OptionsGridSize />
      <OptionsGridColor />
    </div>
  );
}
