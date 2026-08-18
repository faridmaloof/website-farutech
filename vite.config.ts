import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// Golden path: React + TypeScript + Vite. Tailwind v4 vía plugin oficial (sin config JS).
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
