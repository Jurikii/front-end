import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    {
      name: "prefix-public-assets",
      enforce: "post",
      renderChunk(code) {
        const base = "/front-end/";
        const regex = /(["'(])\/([\w@.\-]+\.(?:png|svg|jpg|jpeg|gif|webp|ico|avif))(["')])/g;
        const updated = code.replace(regex, `$1${base}$2$3`);
        if (updated !== code) return { code: updated, map: null };
        return null;
      },
    },
  ],
  base: '/front-end/'
});
