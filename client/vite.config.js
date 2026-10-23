
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Forward /api requests to the Express server.
  server: {
    proxy: {
      "/api": "http://localhost:5002",
    },
  },
});
