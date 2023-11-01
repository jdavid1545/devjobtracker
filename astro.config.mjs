import { defineConfig } from 'astro/config';
import netlify from "@astrojs/netlify/functions";
import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    output: "hybrid",
    server: {
      // host: "127.0.0.1",
      port: 3000,
    },
    integrations: [react()],
    vite: {
      optimizeDeps: {
        exclude: ["crypto"],
      },
    },
    // adapter: netlify(),
    adapter: node({
      mode: "standalone",
    }),
  });