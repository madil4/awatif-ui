import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 4600,
    open: "/examples/basic/index.html",
  },
  build: {
    rollupOptions: {
      input: {
        landing: "index.html",
        docs: "docs/index.html",
        basic: "examples/basic/index.html",
        beam: "examples/beam/index.html",
      },
    },
  },
});
