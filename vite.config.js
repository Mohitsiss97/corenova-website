import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

import { brand } from './src/data/brand.js'

// index.html cannot import JS, so the brand values are substituted here at
// build time. Keeps data/brand.js the only place identity is defined.
const brandHtml = {
  name: 'brand-html',
  transformIndexHtml(html) {
    return html
      .replaceAll('%BRAND_NAME%', brand.name)
      .replaceAll('%BRAND_TAGLINE%', brand.tagline)
      .replaceAll(
        '%BRAND_DESCRIPTION%',
        `${brand.name} builds and ships enterprise software — ready-to-deploy products across 18 categories, plus custom engineering teams. Cloud, private cloud or on-premise.`,
      )
  },
}

// https://vite.dev/config/
// `base` matches the GitHub Pages repo path so built asset URLs resolve under
// https://mohitsiss97.github.io/corenova-website/. Anything reading a public/
// asset at runtime must prefix import.meta.env.BASE_URL for the same reason.
export default defineConfig({
  base: '/corenova-website/',
  plugins: [react(), brandHtml],
})
