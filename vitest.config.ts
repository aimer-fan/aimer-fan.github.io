import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vitest/config'

const __dirname = new URL('.', import.meta.url).pathname

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  resolve: { alias: { '@': __dirname } },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
  },
})
