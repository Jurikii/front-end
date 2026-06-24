import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const BASE = "/front-end/";
const ASSET_EXT = "(?:png|svg|jpg|jpeg|gif|webp|ico|avif)";
const ASSET_REGEX = new RegExp(
  `(["'()])\\/([\\w@.\\-]+\\.${ASSET_EXT})(["')])`,
  "g",
);
const CSS_URL_REGEX = new RegExp(
  `(url\\(['"]?)\\/([\\w@.\\-]+\\.${ASSET_EXT})(['"]?\\))`,
  "g",
);

export default defineConfig({
  build: { outDir: "build" },
  base: BASE,
  plugins: [
    react(),
    {
      name: "prefix-public-assets",
      enforce: "post",
      transform(code, id) {
        if (id.endsWith(".css")) {
          const updated = code.replace(CSS_URL_REGEX, `$1${BASE}$2$3`);
          if (updated !== code) return { code: updated, map: null };
        }
        if (/\.(?:js|jsx|ts|tsx)$/.test(id)) {
          const updated = code.replace(ASSET_REGEX, `$1${BASE}$2$3`);
          if (updated !== code) return { code: updated, map: null };
        }
        return null;
      },
      renderChunk(code) {
        const updated = code.replace(ASSET_REGEX, `$1${BASE}$2$3`);
        if (updated !== code) return { code: updated, map: null };
        return null;
      },
    },
  ],
});
