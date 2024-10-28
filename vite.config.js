import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' 

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        src: "/src",
      },
    },
    define: {
      "process.env": env,
    },
    plugins: [react(), svgr({
      svgrOptions: {}
    })]
  }
})