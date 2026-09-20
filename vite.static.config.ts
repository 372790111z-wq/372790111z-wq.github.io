import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
// Portable static build: original Manus tooling remains in vite.config.ts.
export default defineConfig({
  root: path.resolve(import.meta.dirname, "client"),
  envDir: import.meta.dirname,
  plugins: [react(), tailwindcss(), {
    name: "local-preview-without-analytics",
    apply: "serve",
    transformIndexHtml: { order: "pre", handler: (html) => html.replace(/<script\s+defer[\s\S]*?<\/script>/, "").replace("</body>", `<script>if(new URLSearchParams(location.search).has('annotations')){const s=document.createElement('script');s.src='/annotation-overlay.js';document.body.append(s)}</script></body>`) },
  }],
  resolve: { alias: { "@": path.resolve(import.meta.dirname, "client/src"), "@shared": path.resolve(import.meta.dirname, "shared") } },
  build: { outDir: path.resolve(import.meta.dirname, "dist/public"), emptyOutDir: true },
  server: { host: "127.0.0.1", port: 18933, strictPort: true },
});
