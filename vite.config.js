import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Giữ lại import này

// Lấy đường dẫn tuyệt đối cho thư mục hiện tại
const __dirname = path.resolve();

export default defineConfig({
  plugins: [react()],

  // 👇 THÊM KHỐI RESOLVE NÀY 👇
  resolve: {
    alias: {
      // Alias '@' sẽ đại diện cho thư mục './src'
      '@': path.resolve(__dirname, './src'),
    },
  },
  // 👆 THÊM KHỐI RESOLVE NÀY 👆

  css: {
    postcss: {
      plugins: [
        // ...
      ],
    },
  },
  server: {
    port: 5173,
  }
});