import Blank from './Blank.vue'
import DocPage from './DocPage.vue'
import Layout from './Layout.vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Preview from '@/components/Preview.vue'


import './custom.css'
import 'virtual:uno.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp ({ app }) {
    app.component('DocPage', DocPage)
    app.component('Blank', Blank)
    app.component('Preview', Preview)
  },
  Layout: Layout,
}

export default theme
