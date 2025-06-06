import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
// import { visualizer } from "rollup-plugin-visualizer";
// import ViteCompressionPlugin from 'vite-plugin-compression';
// import imagemin from 'unplugin-imagemin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // visualizer({ open: true }),
    react(),
    // ViteCompressionPlugin({
    //   algorithm: "gzip",
    //   ext: ".gz",
    //   deleteOriginFile: true,
    // }),
    // imagemin()
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  rollupOptions: {
    output: {
      chunkFileNames: "js/[name]-[hash].js", // 生成chunk文件名的名称
      entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
      assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
    },
  },
});
