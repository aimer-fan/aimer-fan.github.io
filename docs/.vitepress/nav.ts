import type { DefaultTheme } from "vitepress";

import sidebar from "./sidebar";
import { getHomeLinkByPrefix } from "./utils/sidebar-helper";

const nav: DefaultTheme.NavItem[] = [
  {
    text: "Web前端",
    link: getHomeLinkByPrefix(sidebar, "/web/"),
    activeMatch: "/web/",
  },
  {
    text: "Bash",
    link: getHomeLinkByPrefix(sidebar, "/bash/"),
    activeMatch: "/bash/",
  },
  {
    text: "Nginx",
    link: getHomeLinkByPrefix(sidebar, "/nginx/"),
    activeMatch: "/nginx/",
  },
  {
    text: "笔记",
    link: getHomeLinkByPrefix(sidebar, "/notes/"),
    activeMatch: "/notes/",
  },
  {
    text: "推荐链接",
    link: getHomeLinkByPrefix(sidebar, "/others/"),
    activeMatch: "/others/",
  },
];

export default nav;
