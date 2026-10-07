import { defineConfig } from 'vitest/config';

// Unit tests sit next to the code they cover; the end-to-end suite in e2e/ runs under Playwright.
export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
