import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      react: path.resolve(import.meta.dirname, "node_modules/react"),
      "react-dom": path.resolve(import.meta.dirname, "node_modules/react-dom"),
      "lucide-react": path.resolve(import.meta.dirname, "node_modules/lucide-react"),
    },
  },
  server: {
    fs: {
      allow: [path.resolve(import.meta.dirname, "..")],
    },
  },
});
