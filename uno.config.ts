import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  theme: {
    breakpoints: {
      md: '768px',
      lg: '960px',
    },
    colors: {
      //
      alt: 'var(--vp-c-bg-alt)',
    },
  },
  shortcuts: { 'blank-main': 'w-1400px mx-auto' },
  presets: [
    presetAttributify(),
    presetUno(),
  ],
})
