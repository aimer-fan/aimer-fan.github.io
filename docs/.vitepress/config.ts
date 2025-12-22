import nav from './nav'
import sidebar from './sidebar'
import { PROJECT_ROOT_PATH } from './utils/constants'
import { customElements } from './utils/custom-elements'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: 'AimerFan',
  description: 'AimerFanのBlog',
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/images/logo.png',
    sidebar,
    nav,
    outline: [2, 3],
    search: {
      provider: 'local',
    },
  },
  vue: {
    template: {
      compilerOptions: {
        // ignore mathjax3 custom elements
        isCustomElement: tag => customElements.includes(tag),
      },
    },
  },
  vite: {
    plugins: [UnoCSS()],
    resolve: { alias: { '@': PROJECT_ROOT_PATH } },
    ssr: { noExternal: ['monaco-edittor'] },
  },
})
