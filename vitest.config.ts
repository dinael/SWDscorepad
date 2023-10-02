import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths()
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      reportsDirectory: './src/tests/unit/coverage'
    },
    resolve: {
      alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    },
    reporters: [
      ['json', { 'file': 'coverage.json' }]
    ],
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
