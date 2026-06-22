import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    allowedHosts: true,
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  preview: {
    allowedHosts: true,
    host: "0.0.0.0",
  },
  plugins: [react()],
});
