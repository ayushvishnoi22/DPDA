import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
     tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/analyze-policy': 'http://localhost:5000',
      '/analyze-pdf': 'http://localhost:5000',
      '/analyze-image': 'http://localhost:5000'
    }
  }
})
