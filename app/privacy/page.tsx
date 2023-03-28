import type { Metadata } from "next";
import Header from "../Header";
import Link from "../Link";

const title = "Privacy Policy";
const description = "Privacy policy for ujc to png.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://ujc-to-png.vercel.app/privacy",
  },
  twitter: {
    title,
    description,
  },
};

export default function PrivacyPage() {
  return (
    <article className="prose dark:prose-invert lg:prose-lg">
      <Header />
      <hr />

      <h2>Privacy Policy</h2>
      <p>Last updated on March 27, 2023</p>

      <h3>First Party</h3>
      <p>
        On this website, we do not directly collect personal information from
        our visitors.
      </p>

      <h3>Hosting</h3>
      <p>
        This website is hosted on <Link href="https://vercel.com/">Vercel</Link>
        , which may collect some data to provide its services.
        <br />
        To learn more about the data collected by Vercel, you can read their{" "}
        <Link href="https://vercel.com/legal/privacy-policy">
          privacy policy
        </Link>
        .
      </p>

      <h3>External Websites</h3>
      <p>
        This website may contain links to external websites not operated by us
        and with different privacy policies.
        <br />
        We recommend you to review the privacy policy of any website you may
        visit.
      </p>

      <h3>Contact Information</h3>
      <p>
        You can contact the website owner on{" "}
        <Link href="https://twitter.com/EdoardoScibona">Twitter</Link> or by{" "}
        <Link href="mailto:info@jsdocs.io">email</Link>.
      </p>

      <hr />
    </article>
  );
}