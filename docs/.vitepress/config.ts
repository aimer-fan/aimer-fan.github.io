import nav from './nav'
import sidebar from './sidebar'
import { PROJECT_ROOT_PATH } from './utils/constants'
import { customElements } from './utils/custom-elements'
import mathjax3 from 'markdown-it-mathjax3'
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
    // markdown-it config
    config (md) {
      md.use(mathjax3)
    },
  },
  themeConfig: {
    logo: '/images/logo.png',
    sidebar,
    nav,
    outline: [2, 3],
    algolia: {
      // cSpell: ignore QD2738AQTM aimer-fanio
      appId: 'QD2738AQTM',
      apiKey: '9497735206c11e45730a841a7b9bb931',
      indexName: 'aimer-fanio',
      placeholder: '请输入关键词',
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
