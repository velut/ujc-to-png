import { compress } from "compress-tag";
import type { Metadata } from "next";
import FAQ from "./FAQ";
import Footer from "./Footer";
import Header from "./Header";
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
    <article className="prose dark:prose-invert lg:prose-lg">
      <Header />
      <hr />

      <Usage />

      <h2>TODO: Dropzone</h2>

      <h2>TODO: Gallery</h2>

      <FAQ />

      <hr />

      <Footer />
    </article>
  );
}
