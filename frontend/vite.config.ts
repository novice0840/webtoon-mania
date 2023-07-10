import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [
      { find: "@src", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      {
        find: "@api",
        replacement: resolve(__dirname, "src/api"),
      },
      {
        find: "@utils",
        replacement: resolve(__dirname, "src/utils"),
      },
      {
        find: "@hooks",
        replacement: resolve(__dirname, "src/hooks"),
      },
      {
        find: "@pages",
        replacement: resolve(__dirname, "src/pages"),
      },
    ],
  },
});
