import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const __dirname = new URL('.', import.meta.url).pathname

export default defineConfig({
  plugins: [Vue()],
  resolve: { alias: { '@': __dirname } },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
    },
  },
})
