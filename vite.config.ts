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
  build: {
    // Two pages for the A/B test: index.html is variant A (the React site), b/index.html
    // is variant B (static HTML + one small script). middleware.ts picks which one `/` serves.
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        b: fileURLToPath(new URL('./b/index.html', import.meta.url)),
      },
    },
  },
})
