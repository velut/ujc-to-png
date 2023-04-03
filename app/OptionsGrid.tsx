import OptionsGridColor from "./OptionsGridColor";
import OptionsGridEnable from "./OptionsGridEnable";

export default function OptionsGrid() {
  return (
    <div className="space-y-4">
      <OptionsGridEnable />
      <OptionsGridColor />
    </div>
  );
}
