import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const base = isGitHubPages ? '/task-manager/' : '/';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: base,
})
