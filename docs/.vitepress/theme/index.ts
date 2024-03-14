import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import Layout from './Layout.vue'
import DocPage from './DocPage.vue'
import Blank from './Blank.vue'

import './custom.css'
import 'virtual:uno.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp ({ app }) {
    app.component('DocPage', DocPage)
    app.component('Blank', Blank)
  },
  Layout: Layout,
}

export default theme
