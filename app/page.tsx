import { compress } from "compress-tag";
import type { Metadata } from "next";
import Dropzone from "./Dropzone";
import FAQ from "./FAQ";
import Gallery from "./Gallery";
import Options from "./Options";
import Usage from "./Usage";

const title = "Download your Nonograms Katana puzzles as images";
const description = compress`
Export, resize, and download your pictures from the game Nonograms Katana.
`;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://ujc-to-png.vercel.app/",
  },
  twitter: {
    title,
    description,
  },
};

export default function IndexPage() {
  return (
    <>
      <Usage />
      <Dropzone />
      <Options />
      <Gallery />
      <FAQ />
    </>
  );
}
