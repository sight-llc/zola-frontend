import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  // Override API URL for Android: Android emulator reaches host via 10.0.2.2
  process.env.VITE_API_URL = "http://10.0.2.2:8000";

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
