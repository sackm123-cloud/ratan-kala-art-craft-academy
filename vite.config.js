import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub project pages need the repository name as the base path.
  base: process.env.GITHUB_ACTIONS ? '/ratan-kala-art-craft-academy/' : '/',
})
