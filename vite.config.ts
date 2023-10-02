/// <reference types="vitest" />
import { defineConfig } from 'vite'
import istanbul from 'vite-plugin-istanbul';
import react from '@vitejs/plugin-react'
import * as path from 'path'

export default defineConfig({
  assetsInclude: [
    'src/assets/**/*'
  ],
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.vue'],
      requireEnv: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      types: `${path.resolve(__dirname, "./src/@types")}`,
    },
  },
})
