import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
const proxy = {
  "/api": {
    target: "http://localhost:9999",
    changeOrigin: true,
    secure: false,
    rewrite: (path: string) => path.replace(/^\/api/, ""),
  },
};

export default defineConfig({
  plugins: [react()],
  server: {
    proxy,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
          @import "${resolve(__dirname, "src/styles/variables.less")}";
          @import "${resolve(__dirname, "src/styles/common.less")}";
        `,
      },
    },
  },
});
