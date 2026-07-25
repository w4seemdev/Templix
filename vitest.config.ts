import { defineConfig, coverageConfigDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'

/**
 * Vitest takes this file *instead of* vite.config.ts (it never merges the two),
 * so the React plugin is declared again here. Tailwind is deliberately absent:
 * `css: false` swaps every stylesheet import for an empty module, so the v4
 * engine never runs during a test and `import './index.css'` costs nothing.
 */
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        ...coverageConfigDefaults.exclude,
        // 61 static demo pages. They are the product being sold, not app
        // logic, and at ~20k lines they would drown every real signal.
        'src/pages/previews/**',
        'src/main.tsx',
        'src/test/**',
        'dist/**',
        'scripts/**',
        '*.config.*',
      ],
      // Ratchet, not a target. Each number sits just under what the suite
      // actually reaches today (53.30 / 57.06 / 46.68 / 55.42), so deleting or
      // gutting a test turns the build red instead of silently lowering the
      // bar. Raise them as coverage grows - never lower them to make a build
      // pass. The 80% house standard is still the destination.
      thresholds: {
        statements: 53,
        branches: 57,
        functions: 46,
        lines: 55,
      },
    },
  },
})
