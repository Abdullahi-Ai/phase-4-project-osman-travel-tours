import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,  // or whatever dev port you want
    proxy: {
      '/': {
        target: 'http://127.0.0.1:5000', // Flask backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
})