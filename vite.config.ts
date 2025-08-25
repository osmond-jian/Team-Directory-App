/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test:{
    globals:true,
    environment:'jsdom',
    setupFiles:'./src/setupTests.ts',
    include: ['src/**/*.test.{ts,tsx}'],
    coverage:{
      provider:'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
