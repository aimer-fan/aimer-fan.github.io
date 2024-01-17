import DefaultTheme from "vitepress/theme";
import { type Theme } from "vitepress";

import Layout from "./Layout.vue";
import DocPage from "./DocPage.vue";

import "./custom.css";
import "virtual:uno.css";


const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp ({ app }) {
    app.component("DocPage", DocPage);
  },
  Layout,
};

export default theme;
