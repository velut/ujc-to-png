import type { NextPage } from "next";
import NextHead from "next/head";
import { Dropzone } from "../../components/Dropzone";
import { Gallery } from "../../components/Gallery";
import { ImageOutputModeSelector } from "../../components/ImageOutputModeSelector";
import { Link } from "../../components/Link";

const Home: NextPage = () => {
  const pageTitle =
    "ujc to png | Export, convert and save your puzzle designs from Nonograms Katana as simple png images";
  const pageDescription =
    "Export, convert and save your ujc puzzle designs from Nonograms Katana as simple png images";

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content="https://ujc-to-png.vercel.app/" />

        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />

        {process.env.NODE_ENV === "production" &&
          typeof window !== "undefined" && (
            <script
              async
              defer
              data-domain="ujc-to-png.vercel.app"
              src="https://plausible.io/js/plausible.outbound-links.js"
            />
          )}
      </NextHead>

      <div className="mx-auto max-w-screen-lg space-y-8 px-4 sm:px-8">
        <section className="mt-8 space-y-4">
          <h1 className="text-center text-4xl">ujc to png</h1>
          <p className="px-4 text-center text-lg sm:px-12 md:px-28 lg:px-64">
            Export, convert and save your puzzle designs from{" "}
            <Link href="https://play.google.com/store/apps/details?id=com.ucdevs.jcross">
              Nonograms Katana
            </Link>{" "}
            as simple png images.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">Usage</h2>
          <p>
            With this tool, nonogram authors can convert their own designs from
            the <span className="font-mono">.ujc</span> files generated by the
            app to standard <span className="font-mono">.png</span> images.
          </p>
          <p>
            To start, open the Nonograms Katana Android app, then tap on the{" "}
            <span className="font-mono font-bold italic">Settings</span> icon in
            the top right corner; once in the settings, open the sub-menu named{" "}
            <span className="font-mono font-bold italic">Other</span> and select{" "}
            <span className="font-mono font-bold italic">
              Save progress to file (zip)
            </span>{" "}
            to export an archive of your data.
          </p>
          <p>
            Using your preferred file manager, extract the{" "}
            <span className="font-mono font-bold italic">
              NonogramsKatana.zip
            </span>{" "}
            archive so that the sub-folder named{" "}
            <span className="font-mono font-bold italic">MyNonograms</span>{" "}
            becomes accessible. This folder contains all the nonograms created
            by you saved as <span className="font-mono">.ujc</span> files.
          </p>
          <p>
            Now, you can drag and drop these files in the area below;
            alternatively, you can click or tap on the area to open a dialog
            where you can select <span className="font-mono">.ujc</span> files.
            The converted images will appear in the gallery below.
          </p>
        </section>

        <section>
          <Dropzone />
        </section>

        <section>
          <h2 className="text-2xl">Your Nonograms</h2>
          <Gallery />
          <ImageOutputModeSelector />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">FAQ</h2>

          <div className="space-y-2">
            <h3 className="text-lg">How does this work?</h3>
            <p>
              This tool analyzes the <span className="font-mono">.ujc</span>{" "}
              files exported from the Nonograms Katana app and extracts the png
              images representing the nonogram designs; to learn more, you can
              review the{" "}
              <Link href="https://github.com/velut/ujc-to-png">
                source code available on GitHub
              </Link>
              .
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">Who is this for?</h3>
            <p>
              This tool is aimed at nonogram authors who want to backup their
              own designs and have them available as images.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">Are my nonograms private?</h3>
            <p>
              Yes. This tool works entirely in your browser and no file ever
              leaves your device.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">
              Can I download nonograms from other authors?
            </h3>
            <p>
              No. This tool does not download nonograms from the Nonograms
              Katana app.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">How many nonograms can I convert?</h3>
            <p>
              As many as you want. Note however that the more nonograms you
              select the slower the process will be, especially on less powerful
              devices.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">
              Why nothing happens after I select the{" "}
              <span className="font-mono">.ujc</span> files?
            </h3>
            <p>
              On less powerful devices, the conversion process can take a few
              seconds. Either wait a little before retrying or convert fewer
              nonograms at a time.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">Why are the extracted images so small?</h3>
            <p>
              When the <span className="italic">Raw Images</span> option is
              selected, images are extracted as-is from the{" "}
              <span className="font-mono">.ujc</span> files and the final
              dimensions reflect the original dimensions of the nonograms. For
              example, a 20x20 nonogram becomes a 20 by 20 pixels image.
            </p>
            <p>
              To save images in a larger format, select one of the{" "}
              <span className="italic">Recolor and scale</span> options. For
              example, scaling a 20x20 nonogram with the{" "}
              <span className="italic">Recolor and scale 25x</span> option
              produces a 500 by 500 pixels image.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">
              Why do some images have transparent backgrounds?
            </h3>
            <p>
              When the <span className="italic">Raw Images</span> option is
              selected, images are extracted as-is from the{" "}
              <span className="font-mono">.ujc</span> files, which represent the
              background color of colored nonograms as transparent.
            </p>
            <p>
              To fix the final colors, select one of the{" "}
              <span className="italic">Recolor</span> options. Note however that
              due to the way that browsers work, this is a lossy operation and
              the final colors may be slightly different from the original ones.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">
              Why can&apos;t I save my nonograms from the Nonograms Katana iOS
              app?
            </h3>
            <p>
              The Android and iOS versions of the Nonograms Katana app are
              different. Unfortunately, the iOS version does not currently
              support saving your nonograms to a local zip file.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg">
              I found an error / I want to ask another question.
            </h3>
            <p>
              Please{" "}
              <Link href="https://github.com/velut/ujc-to-png/issues">
                open an issue on Github
              </Link>
              .
            </p>
          </div>
        </section>

        <div>
          <footer className="mt-12 border-t border-stone-500 py-6">
            <p>
              Website by{" "}
              <Link href="https://twitter.com/EdoardoScibona">
                Edoardo Scibona
              </Link>
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="https://github.com/velut/ujc-to-png">GitHub</Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Home;