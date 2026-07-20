import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  // Use the live API — the .env file has VITE_API_URL=https://zola-backend.fastapicloud.dev/
  // Android emulator users should ensure the device can reach the live API URL.
  // For local dev on Android emulator with a local backend, set VITE_API_URL in .env.local.

  return {
    plugins: [
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      routeToken: "layout",
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
    ],
    build: {
      outDir: "dist-capacitor",
      emptyOutDir: true,
      rollupOptions: {
        input: "index.html",
      },
    },
  };
});
