import OptionsGrid from "./OptionsGrid";
import OptionsRecolor from "./OptionsRecolor";
import OptionsScale from "./OptionsScale";

export default function Options() {
  return (
    <div>
      <h2>Options</h2>
      <hr />
      <OptionsRecolor />
      <hr />
      <OptionsScale />
      <hr />
      <OptionsGrid />
      <hr />
    </div>
  );
}
