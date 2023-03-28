import { Metadata } from "next";
import Footer from "./Footer";
import Header from "./Header";
import "./globals.css";

const title = {
  default: "ujc to png",
  template: "%s | ujc to png",
};

export const metadata: Metadata = {
  title,
  openGraph: {
    title,
    siteName: "ujc to png",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark:bg-gray-800">
        <div className="container mx-auto flex justify-center p-8 md:p-12">
          <article className="prose dark:prose-invert lg:prose-lg">
            <Header />
            <hr />

            {children}

            <hr />
            <Footer />
          </article>
        </div>
      </body>
    </html>
  );
}
