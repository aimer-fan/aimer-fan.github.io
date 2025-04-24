import themeDark from './theme/vitepress-dark'
import themeLight from './theme/vitepress-light'
import * as monaco from 'monaco-editor'
import type * as Monaco from 'monaco-editor'
import { useData } from 'vitepress'
import './worker.js'

export function useMonaco () {
  monaco.editor.defineTheme('vitepress-dark', themeDark)
  monaco.editor.defineTheme('vitepress-light', themeLight)

  function supportTSX () {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      noEmit: true,
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
    })

    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    })

    const definitions: Record<string, string> = import.meta.glob(
      [
        '../../node_modules/@types/react/*',
        '../../node_modules/@types/react-dom/*',
      ],
      {
        query: '?raw',
        import: 'default',
        eager: true,
      },
    )
    for (const [key, value] of Object.entries(definitions)) {
      const path = `file:///node_modules/@types/${key.replace('../../node_modules/@types/', '')}`
      monaco.languages.typescript.typescriptDefaults.addExtraLib(value, path)
    }
  }

  const { isDark } = useData()

  const defaultOptions: Monaco.editor.IStandaloneEditorConstructionOptions = {
    automaticLayout: true,
    fontSize: 14,
    theme: isDark.value ? 'vitepress-dark' : 'vitepress-light',
  }

  return { monaco, defaultOptions, isDark, supportTSX }
}
