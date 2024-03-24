import { defineConfig } from "astro/config";
import db from "@astrojs/db";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [
    db(),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: "server",
  vite: {
    optimizeDeps: { exclude: ["fsevents"] },
  },
});
