import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Change '/cat-oracle/' to match your GitHub repo name exactly
// e.g. if your repo is github.com/you/my-cats → base: '/my-cats/'
export default defineConfig({
  plugins: [react()],
  base: '/cat/',
})
