import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";

import "./custom.css";
import "virtual:uno.css";

export default {
  ...DefaultTheme,
  Layout,
};
