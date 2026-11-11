import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base relativa: o build em dist/ funciona em qualquer pasta ou domínio
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // "@/..." aponta para src/, como nos projetos shadcn
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { port: 5173, host: 'localhost' },
})
