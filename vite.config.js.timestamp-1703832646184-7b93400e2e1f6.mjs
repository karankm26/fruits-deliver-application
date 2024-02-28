// vite.config.js
import { defineConfig } from "file:///C:/Users/mobiweb/Downloads/Backroom%20Games%20Admin/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/mobiweb/Downloads/Backroom%20Games%20Admin/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { resolve } from "path";
var __vite_injected_original_dirname = "C:\\Users\\mobiweb\\Downloads\\Backroom Games Admin";
var vite_config_default = defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}
  },
  cssCodeSplit: true,
  rollupOptions: {
    output: [
      {
        //让打包目录和我们目录对应
        preserveModules: true,
        //配置打包根目录
        dir: resolve(__vite_injected_original_dirname, "./dist/assets")
      }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxtb2Jpd2ViXFxcXERvd25sb2Fkc1xcXFxCYWNrcm9vbSBHYW1lcyBBZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcbW9iaXdlYlxcXFxEb3dubG9hZHNcXFxcQmFja3Jvb20gR2FtZXMgQWRtaW5cXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL21vYml3ZWIvRG93bmxvYWRzL0JhY2tyb29tJTIwR2FtZXMlMjBBZG1pbi92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBkZWZpbmU6IHtcbiAgICBcInByb2Nlc3MuZW52XCI6IHt9LFxuICB9LFxuICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gIHJvbGx1cE9wdGlvbnM6IHtcbiAgICBvdXRwdXQ6IFtcbiAgICAgIHtcbiAgICAgICAgLy9cdThCQTlcdTYyNTNcdTUzMDVcdTc2RUVcdTVGNTVcdTU0OENcdTYyMTFcdTRFRUNcdTc2RUVcdTVGNTVcdTVCRjlcdTVFOTRcbiAgICAgICAgcHJlc2VydmVNb2R1bGVzOiB0cnVlLFxuICAgICAgICAvL1x1OTE0RFx1N0Y2RVx1NjI1M1x1NTMwNVx1NjgzOVx1NzZFRVx1NUY1NVxuICAgICAgICBkaXI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vZGlzdC9hc3NldHNcIiksXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlUsU0FBUyxvQkFBb0I7QUFDMVcsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsZUFBZTtBQUZ4QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sZUFBZSxDQUFDO0FBQUEsRUFDbEI7QUFBQSxFQUNBLGNBQWM7QUFBQSxFQUNkLGVBQWU7QUFBQSxJQUNiLFFBQVE7QUFBQSxNQUNOO0FBQUE7QUFBQSxRQUVFLGlCQUFpQjtBQUFBO0FBQUEsUUFFakIsS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUN6QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
