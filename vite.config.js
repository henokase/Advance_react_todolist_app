import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist', // Output directory for build files
  },
  plugins: [react()],
  server: {
    port: 3000,
  },
})
