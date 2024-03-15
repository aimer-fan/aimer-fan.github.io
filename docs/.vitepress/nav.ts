import type { DefaultTheme } from 'vitepress'

import sidebar from './sidebar'
import { getHomeLinkByPrefix } from './utils/sidebar-helper'

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Web前端',
    link: getHomeLinkByPrefix(sidebar, '/web/'),
    activeMatch: '/web/',
  },
  {
    text: 'Bash',
    link: getHomeLinkByPrefix(sidebar, '/bash/'),
    activeMatch: '/bash/',
  },
  {
    text: 'Nginx',
    link: getHomeLinkByPrefix(sidebar, '/nginx/'),
    activeMatch: '/nginx/',
  },
  {
    text: '笔记',
    link: getHomeLinkByPrefix(sidebar, '/notes/'),
    activeMatch: '/notes/',
  },
  {
    text: '在线工具',
    // activeMatch: '/tools/',
    items: [
      {
        text: '预览帧动画',
        link: '/tools/frame-animation',
      },
      {
        text: '代码对比',
        link: '/tools/difference',
      },
    ],
  },
  {
    text: '其他',
    link: getHomeLinkByPrefix(sidebar, '/others/'),
    activeMatch: '/others/',
  },
]

export default nav
