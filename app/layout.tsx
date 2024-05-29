import { Metadata } from "next";
import Footer from "./Footer";
import Header from "./Header";
import Providers from "./Providers";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://ujc-to-png.vercel.app"),
	openGraph: {
		siteName: "ujc to png",
		type: "website",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="dark:bg-gray-800">
				<Providers>
					<div className="container mx-auto flex justify-center p-8 md:p-12">
						<article className="prose dark:prose-invert lg:prose-lg">
							<Header />
							<hr />
							{children}
							<hr />
							<Footer />
						</article>
					</div>
				</Providers>
			</body>
		</html>
	);
}
