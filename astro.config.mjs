// @ts-check
import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      // See https://github.com/withastro/astro/issues/14030
      // @ts-expect-error
      tailwindcss(),
      isProduction && (await import("./vite-plugin-licenses")).licenses(),
    ],
  },
  integrations: [alpinejs({ entrypoint: "/src/scripts/alpine" })],
});
