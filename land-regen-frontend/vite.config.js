import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    copyPublicDir: true, // ✅ ensures files like _redirects and favicon are copied
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
    chunkSizeWarningLimit: 1000, // Optional: avoid large bundle warnings
  },
  server: {
    port: 5173, // or your preferred dev port
    open: true,
  },
})
