import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This ensures assets work correctly on GitHub Pages
  // If your repo is https://github.com/user/my-portfolio, this should be '/my-portfolio/'
  // If you are using a custom domain or user.github.io, you can leave it as '/'
  base: './', 
})