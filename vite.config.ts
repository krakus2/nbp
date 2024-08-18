import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { checker } from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({ root: './' }),
    TanStackRouterVite(),
    checker({
      typescript: true,
      eslint: { lintCommand: 'eslint "./src/**/*.{js,ts,tsx}"' },
      overlay: {
        initialIsOpen: false,
      },
    }),
  ],
})
