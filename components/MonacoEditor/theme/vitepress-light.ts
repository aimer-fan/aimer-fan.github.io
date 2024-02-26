import type * as Monaco from 'monaco-editor'

const vitepress: Monaco.editor.IStandaloneThemeData = {
  base: 'vs',
  inherit: true,
  rules: [],
  colors: { 'editor.background': '#ffffffff' },
}

export default vitepress
