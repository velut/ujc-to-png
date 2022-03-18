import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark:bg-stone-800 dark:text-white">
      <Head />
      <body>
        {/* Canvas needed to work on images */}
        <div className="hidden">
          <canvas id="work-canvas" />
        </div>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
