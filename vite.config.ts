import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: "**/*.tsx",
    }),
  ],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    watch: {
      usePolling: true
    }
  },
  define: {
    'process.env': process.env
  }
})
