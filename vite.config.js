import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Detect branch (default to 'main')
const branch = process.env.BRANCH || 'main'

// Adjust base path depending on branch
const base =
    branch === 'carousel-refactor'
        ? '/mateus_portfolio/' // GitHub Pages always uses the same base
        : '/mateus_portfolio/' // You can make this conditional if you had previews like '/mateus_portfolio/preview/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
})
