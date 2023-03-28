import { compress } from "compress-tag";
import type { Metadata } from "next";
import Header from "./Header";
import Link from "./Link";
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

      <h2>FAQ</h2>
      <ul>
        <li>
          <p>
            <strong>How does this tool work?</strong>
          </p>
          <p>
            This tool analyzes the raw <code>.ujc</code> files and extracts the
            png images contained in them that represent the nonogram pictures.
          </p>
          <p>
            To learn more, you can review the{" "}
            <Link href="https://github.com/velut/ujc-to-png">
              source code available on GitHub
            </Link>
            .
          </p>
        </li>
        <li>
          <p>
            <strong>Who is this tool for?</strong>
          </p>
          <p>
            This is a tool for nongram authors who want to backup their own
            designs and have them available as images.
          </p>
        </li>
        <li>
          <p>
            <strong>Are my nonograms private?</strong>
          </p>
          <p>
            <strong>Yes</strong>. This tool works entirely inside your browser
            and no file ever leaves your device.
          </p>
        </li>
        <li>
          <p>
            <strong>Can I download nonograms from other authors?</strong>
          </p>
          <p>
            <strong>No</strong>. To respect the work of other authors, this tool
            does not allow you to download nonograms from the Nonograms Katana
            app.
          </p>
        </li>
        <li>
          <p>
            <strong>How many nonograms can I convert?</strong>
          </p>
          <p>
            As many as you want. Note, however, that the more nonograms you add
            together the slower the process will be, especially on less powerful
            devices.
          </p>
        </li>
        <li>
          <p>
            <strong>
              Why nothing happens after I select the
              <code>.ujc</code> files?
            </strong>
          </p>
          <p>
            On less powerful devices, the conversion process can take a few
            seconds. Either wait a little before retrying or convert fewer
            nonograms at a time.
          </p>
        </li>
        <li>
          <p>
            <strong>Why are the extracted images so small?</strong>
          </p>
          <p>
            When the <code>Raw Images</code> option is selected, images are
            extracted as-is from the <code>.ujc</code> files. This means that
            the final dimensions of an image correspond to the original
            dimensions of its nonogram. For example, a 20x20 nonogram becomes a
            tiny 20x20 pixels image.
          </p>
          <p>
            To save images in a larger format, select one of the{" "}
            <code>Recolor and scale</code> options. For example, scaling a 20x20
            nonogram with the <code>Recolor and scale 25x</code> option produces
            a 500x500 pixels image, since <code>20*25 = 500</code>.
          </p>
        </li>
        <li>
          <p>
            <strong>Why do some images have transparent backgrounds?</strong>
          </p>
          <p>
            When the <code>Raw Images</code> option is selected, images are
            extracted as-is from the <code>.ujc</code> files, which internally
            represent the background color of colored nonograms as transparent.
          </p>
          <p>
            To fix the final colors, select one of the <code>Recolor</code>{" "}
            options. Note however that due to{" "}
            <Link href="https://html.spec.whatwg.org/multipage/canvas.html#dom-context-2d-getimagedata">
              the way that browsers work
            </Link>{" "}
            , this is a lossy operation and the final colors may be slightly
            different from the original ones you selected in the app editor.
          </p>
        </li>
        <li>
          <p>
            <strong>
              Can I save my nonograms from the Nonograms Katana iOS app?
            </strong>
          </p>
          <p>
            <strong>No</strong>. Unfortunately, the Android and iOS versions of
            the Nonograms Katana app are different and the iOS version does not
            currently support exporting your nonograms to a local file.
          </p>
        </li>
        <li>
          <p>
            <strong>I found an error / I want to ask another question.</strong>
          </p>
          <p>
            Please{" "}
            <Link href="https://github.com/velut/ujc-to-png/issues">
              open an issue on Github
            </Link>
            , it&apos;s the fastest way to reach me and have your question seen.
          </p>
        </li>
      </ul>

      <hr />

      <p>
        Website created by{" "}
        <Link href="https://github.com/velut">Edoardo Scibona</Link>.
      </p>

      <ul>
        <li>
          <Link href="/privacy">Privacy Policy</Link>
        </li>
        <li>
          <Link href="https://github.com/velut/ujc-to-png">GitHub</Link>
        </li>
      </ul>
    </article>
  );
}
