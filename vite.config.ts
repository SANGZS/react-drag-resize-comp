import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/react-drag-resize-comp/", // 关键配置
  plugins: [react()],
  server: {
    port: 3000,
  },
});
