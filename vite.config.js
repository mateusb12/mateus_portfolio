/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const deployTarget = process.env.VITE_DEPLOY_TARGET || 'coolify'
const basePaths = {
  coolify: '/',
  githubPages: '/mateus_portfolio/',
}

if (!basePaths[deployTarget]) {
  throw new Error(
    `Unknown VITE_DEPLOY_TARGET "${deployTarget}". Use "coolify" or "githubPages".`,
  )
}

// https://vite.dev/config/
export default defineConfig({
  base: basePaths[deployTarget],
  plugins: [react(), tailwindcss()],
})
