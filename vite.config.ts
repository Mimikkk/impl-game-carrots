import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  base: "./",
  plugins: [solidPlugin()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "./src/shared"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@logic": path.resolve(__dirname, "./src/shared/logic"),
      "@components": path.resolve(__dirname, "./src/shared/components"),
      "@types": path.resolve(__dirname, "./src/shared/types"),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
