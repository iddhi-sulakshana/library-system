import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        assetsInclude: ["assets"],
    },
    server: {
        port: process.env.PORT || 80,
    },
});
