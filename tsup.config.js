import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/popup.ts', 'src/content.ts'],
  minify: false,
  publicDir: true,
})
