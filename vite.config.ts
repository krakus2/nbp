/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths({ root: './' }), TanStackRouterVite()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests/setupTests.ts',
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
