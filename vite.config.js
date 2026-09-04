import { defineConfig } from 'vite'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default defineConfig({
  base: process.env.VITE_BASE_PATH || (process.env.GITHUB_ACTIONS ? '/vasatis/' : '/'),
  plugins: [{
    name: 'crawler-rules',
    transformIndexHtml(html) {
      return html.replace('__ROBOTS__', process.env.GITHUB_ACTIONS ? 'noindex, nofollow' : 'index, follow')
    },
    closeBundle() {
      const content = process.env.GITHUB_ACTIONS
        ? 'User-agent: *\nDisallow: /\n'
        : 'User-agent: *\nAllow: /\nSitemap: https://vasatis.com/sitemap.xml\n'
      writeFileSync(resolve('dist/robots.txt'), content)
    }
  }]
})