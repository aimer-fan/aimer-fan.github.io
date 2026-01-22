import { init } from 'modern-monaco'
import { useData } from 'vitepress'

export type Monaco = Awaited<ReturnType<typeof init>>
export type Editor = ReturnType<Monaco['editor']['create']>
export type DiffEditor = ReturnType<Monaco['editor']['createDiffEditor']>
export type Model = ReturnType<Editor['getModel']>

export function useModernMonaco () {
  const { isDark } = useData()

  const THEME_DARK = 'vitesse-dark' as const
  const THEME_LIGHT = 'vitesse-light' as const

  const setup = async () => {
    // HACK: theme sorting should be calculated from isDark on initial load
    const themes = isDark.value
      ? [THEME_DARK, THEME_LIGHT]
      : [THEME_LIGHT, THEME_DARK]

    const monaco = await init({
      defaultTheme: isDark.value ? THEME_DARK : THEME_LIGHT,
      themes: themes,
      langs: ['typescript', 'javascript', 'json', 'css', 'html', 'xml'],
    })

    return monaco
  }

  const triggerThemeChange = async (monaco: Monaco) => {
    const newTheme = isDark.value ? THEME_DARK : THEME_LIGHT
    monaco.editor.setTheme(newTheme)
  }

  return {
    setup,
    triggerThemeChange,
  }
}

export const defaultEditorOptions = {
  fontSize: 14,
  automaticLayout: true,
  scrollBeyondLastLine: true,
  minimap: {
    enabled: true,
    autohide: 'none',
    showSlider: 'always',
  },
} as const
