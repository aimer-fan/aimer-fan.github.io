import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export const __dirname = dirname(fileURLToPath(import.meta.url))

export const PROJECT_ROOT_PATH = resolve(__dirname, '../../../')
export const MARKDOWN_ROOT_PATH = resolve(PROJECT_ROOT_PATH, './docs/')
