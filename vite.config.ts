import path from 'path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      types: path.resolve(__dirname, 'src/types')
    }
  }
})
