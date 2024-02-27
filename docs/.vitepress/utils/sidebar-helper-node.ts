import { relative, resolve, parse } from 'node:path'
import type { DefaultTheme } from 'vitepress'
import { readFileSync } from 'node:fs'
import { MARKDOWN_ROOT_PATH } from './constants'

/**
 * 通过路径映射成 sidebar 的配置
 */
export function genSidebarItemByPath (path: string): DefaultTheme.SidebarItem {
  if (path.startsWith('/')) path = path.slice(1)

  if (!path.endsWith('.md')) path += '.md'

  const fullPath = resolve(MARKDOWN_ROOT_PATH, path)
  const p = parse(relative(MARKDOWN_ROOT_PATH, fullPath))
  const link = resolve('/', p.dir, p.name)
  return {
    link,
    text: getMarkdownTitle(fullPath),
  }
}

function getMarkdownTitle (path: string) {
  const content = readFileSync(path, 'utf8')
  const match = content.match(/(?<=(^#)\s).*/mg)
  return match ? match[0] : ''
}
