import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

export default defineConfig({
  plugins: [react()],
  base: '/SecureUs/',
  // define: {
  //   'import.meta.env.VITE_APP_API_URL': JSON.stringify(import.meta.env.VITE_APP_API_URL)
  // },
  build: {
    outDir: 'dist'
  }
})
