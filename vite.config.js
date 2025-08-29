import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React vendor chunk
          vendor: ["react", "react-dom"],

          // Animation libraries
          animations: ["gsap", "@gsap/react", "lenis"],

          // Heavy components (loaded lazily)
          editor: ["prism-react-renderer"],
          calendar: ["react-github-calendar"],

          // HTTP and utilities
          utils: ["axios", "prop-types"],
        },
      },
    },
    // Increase warning limit to 700KB since we're code splitting
    chunkSizeWarningLimit: 700,
  },
});
