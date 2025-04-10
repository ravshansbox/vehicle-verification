import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/popup.ts', 'src/content.ts'],
  minify: false,
  publicDir: true,
})
