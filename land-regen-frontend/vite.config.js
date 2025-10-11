import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ React + Vite configuration for production builds
export default defineConfig({
  plugins: [react()],
  base: './', // ✅ ensures assets load correctly in production
  build: {
    outDir: 'dist',
  },
  server: {
    port: 5173,
  },
})
