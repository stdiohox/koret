import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // `@` -> src, the shadcn convention. Must stay in sync with `paths` in
    // tsconfig.app.json — Vite resolves the bundle, tsc resolves the types.
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
