import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// `base` matches the GitHub Pages repo path so built asset URLs resolve under
// https://mohitsiss97.github.io/corenova-website/. Anything reading a public/
// asset at runtime must prefix import.meta.env.BASE_URL for the same reason.
export default defineConfig({
  base: '/corenova-website/',
  plugins: [react()],
})
