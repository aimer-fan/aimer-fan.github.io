import type { MarkdownOptions } from 'vitepress'
import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import { container } from '@mdit/plugin-container'

type MarkdownIt = Parameters<NonNullable<MarkdownOptions['config']>>[0]
type Token = Parameters<NonNullable<MarkdownItContainerOptions['openRender']>>[0][number]
export function CodePlugin (md: MarkdownIt) {
  md.use(container, {
    name: 'preview',
    openRender: (tokens, idx) => {
      const token = tokens[idx]
      if (!token) return

      const findToken = (start: number, type: string, nesting: number = 0): Token | null => {
        for (let i = start; i < tokens.length; i++) {
          const t = tokens[i]
          if (!t) return null
          if (t.type === type && t.nesting === nesting) {
            return tokens[i] ?? null
          }
        }
        return null
      }

      const fenceToken = findToken(idx, 'fence')
      const source = fenceToken?.content ?? ''

      return `<Preview source="${encodeURIComponent(source)}">`
    },
    closeRender: (tokens, idx) => {
      const token = tokens[idx]
      if (!token) return
      return '</Preview>'
    },
  } as MarkdownItContainerOptions)
}
