import * as monaco from 'monaco-editor'
import type * as Monaco from 'monaco-editor'
import themeDark from './theme/vitepress-dark'
import themeLight from './theme/vitepress-light'
import { useData } from 'vitepress'
import './worker.js'

export function useMonaco () {
  monaco.editor.defineTheme('vitepress-dark', themeDark)
  monaco.editor.defineTheme('vitepress-light', themeLight)

  const { isDark } = useData()

  const defaultOptions: Monaco.editor.IStandaloneEditorConstructionOptions = {
    automaticLayout: true,
    fontSize: 14,
    theme: isDark.value ? 'vitepress-dark' : 'vitepress-light',
  }

  return { monaco, defaultOptions, isDark }
}
