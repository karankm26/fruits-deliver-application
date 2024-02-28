import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  // base: "/",
  plugins: [react()],
  define: {
    "process.env": {},
  },
  cssCodeSplit: true,
  rollupOptions: {
    output: [
      {
        //让打包目录和我们目录对应
        preserveModules: true,
        //配置打包根目录
        dir: resolve(__dirname, "./assets"),
      },
    ],
  },
});
