import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/src": path.resolve(__dirname, "./src"),
      "@/convex": path.resolve(__dirname, "./convex"),
    },
  },
});
