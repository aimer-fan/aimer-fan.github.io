import type { DefaultTheme } from "vitepress";
import { genSidebarItemByPath } from "./utils/sidebar-helper-node";

const sidebar: DefaultTheme.Sidebar = {

  "/web/": [
    "/web/css",
    "/web/manual-cpu-throttling-rate",
    "/web/view-transitions",
    "/web/cache",
    "/web/vue/async-with-composition-api",
    "/web/qiankun",
    "/web/v8-gc",
  ].map(genSidebarItemByPath),

  "/bash/": [
    "/bash/introduction",
    "/bash/basic-syntax",
    "/bash/schema-extension",
    "/bash/quotes-and-escaping",
    "/bash/env-variables",
    "/bash/strings",
    "/bash/arithmetic",
    "/bash/readline",
    "/bash/stack",
    "/bash/script",
    "/bash/read",
    "/bash/condition",
    "/bash/loop",
    "/bash/function",
    "/bash/array",
    "/bash/set",
    "/bash/debug",
    "/bash/mktemp",
    "/bash/startup",
    "/bash/prompt",
  ].map(genSidebarItemByPath),

  "/nginx/": [
    "/nginx/location",
    "/nginx/proxy-pass",
  ].map(genSidebarItemByPath),

  "/notes/": [
    "/notes/type/format-date",
    "/notes/volar-vue-sfc-type-error",
    "/notes/bugs/permission",
    "/notes/bugs/safari-theme-color",
  ].map(genSidebarItemByPath),

  "/others/": [
    "/others/links",
    "/others/vscode-settings",
  ].map(genSidebarItemByPath),
};

export default sidebar;
