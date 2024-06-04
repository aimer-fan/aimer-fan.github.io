import { defineConfig } from '@aimerfan/eslint-config'

export default defineConfig({
  overrides: [
    { ignores: ['**/cache/**', '**/dist/**'] },
  ],
})
