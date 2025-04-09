import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    lib: {
      entry: {
        popup: resolve(__dirname, 'src/popup.ts'),
        content: resolve(__dirname, 'src/content.ts'),
      },
      formats: ['es'],
    },
    minify: false,
  },
})
