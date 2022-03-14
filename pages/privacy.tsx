import type { NextPage } from "next";
import NextHead from "next/head";

const PrivacyPage: NextPage = () => {
  const pageTitle = "ucj to png | Privacy Policy";
  const pageDescription = "Privacy Policy for ujc to png";

  return (
    <>
      <NextHead>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta
          property="og:url"
          content="https://ujc-to-png.vercel.app/privacy"
        />

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
          <h1 className="text-center text-4xl">Privacy Policy</h1>
          <p className="px-4 text-center text-lg sm:px-12 md:px-28 lg:px-64">
            Last updated on March 14, 2022
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">First Party</h2>
          <p>
            On this website, we do not directly collect personal information
            from our visitors.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">Analytics</h2>
          <p>
            To measure traffic and usage statistics for this website, we use{" "}
            <a className="underline" href="https://plausible.io/">
              Plausible
            </a>
            , a privacy-friendly web analytics tool.
          </p>

          <p>
            Plausible doesn&apos;t use cookies and doesn&apos;t collect or store
            personal data.
          </p>

          <p>
            To learn more about the data collected by Plausible, you can visit
            their{" "}
            <a className="underline" href="https://plausible.io/data-policy">
              data policy
            </a>{" "}
            and{" "}
            <a className="underline" href="https://plausible.io/privacy">
              privacy policy
            </a>{" "}
            pages.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">Hosting</h2>
          <p>
            This website is hosted on{" "}
            <a className="underline" href="https://vercel.com/">
              Vercel
            </a>
            , which may collect some data to provide its hosting services.
          </p>

          <p>
            To learn more about the data collected by Vercel, you can visit
            their{" "}
            <a
              className="underline"
              href="https://vercel.com/legal/privacy-policy"
            >
              privacy policy
            </a>{" "}
            page.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">Links to external websites</h2>
          <p>
            This website may contain links to external websites not operated by
            us and with different privacy policies.
          </p>

          <p>
            We recommend you to review the privacy policy of any website you may
            visit.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl">Contact information</h2>
          <p>
            You can contact the website author on{" "}
            <a className="underline" href="https://twitter.com/EdoardoScibona">
              Twitter
            </a>{" "}
            or by{" "}
            <a className="underline" href="mailto:info@jsdocs.io">
              email
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
};

export default PrivacyPage;
