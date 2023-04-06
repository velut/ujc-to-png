"use client";

import OptionsGrid from "./OptionsGrid";
import OptionsRecolor from "./OptionsRecolor";
import OptionsScale from "./OptionsScale";

export default function OptionsClient() {
  return (
    <div>
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
