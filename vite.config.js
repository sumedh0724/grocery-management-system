import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Correct config for Vercel (React Router SPA)
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures all routes (like /login, /stock) work after deploy
})
