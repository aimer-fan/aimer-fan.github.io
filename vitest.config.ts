import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

const __dirname = new URL('.', import.meta.url).pathname

export default defineConfig({
  plugins: [
    Vue(),
  ],
  resolve: {
    alias: {
      '@': __dirname,
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
