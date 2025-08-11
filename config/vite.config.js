import { defineConfig } from 'vite';

export default defineConfig({
  base: "./",
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      'httpie': 'httpie/browser',
    },
  },
  optimizeDeps: {
  },
  server: {
    host: true,
    hmr: false
  }
});
