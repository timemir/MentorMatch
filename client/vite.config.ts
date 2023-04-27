/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vite/client" />
/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://server:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api/"),
        secure: false, // TODO: remove after dev
      },
    },
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 5173,
  },
});
