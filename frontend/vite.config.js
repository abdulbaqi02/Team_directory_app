import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Proxy API requests to ColdFusion server during development
      '/rest': {
        target: 'http://localhost:8500',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
