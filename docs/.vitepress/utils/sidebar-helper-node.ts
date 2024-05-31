import type { DefaultTheme } from 'vitepress'
import { readFileSync } from 'node:fs'
import { posix, resolve } from 'node:path'

import { MARKDOWN_ROOT_PATH } from './constants'

/**
 * 通过路径映射成 sidebar 的配置
 */
export function genSidebarItemByPath (path: string): DefaultTheme.SidebarItem {
  if (path.startsWith('/')) path = path.slice(1)

  if (!path.endsWith('.md')) path += '.md'

  return {
    link: getPosixLinkPath(path),
    text: getMarkdownTitle(resolve(MARKDOWN_ROOT_PATH, path)),
  }
}

function getPosixLinkPath (path: string) {
  const { relative, resolve, parse } = posix
  const fullPath = resolve(MARKDOWN_ROOT_PATH, path)
  const p = parse(relative(MARKDOWN_ROOT_PATH, fullPath))
  return resolve('/', p.dir, p.name)
}

function getMarkdownTitle (path: string) {
  const content = readFileSync(path, 'utf8')
  const match = content.match(/(?<=(^#)\s).*/mg)
  return match ? match[0] : ''
}
