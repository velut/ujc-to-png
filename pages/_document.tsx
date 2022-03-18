import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark:bg-stone-800 dark:text-white">
      <Head />
      <body>
        {/* Canvases needed to work on images */}
        <div className="hidden">
          <canvas id="recolor-canvas" />
          <canvas id="scale-canvas" />
        </div>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
