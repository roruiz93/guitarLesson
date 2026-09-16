import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: './index.html',
    },
    target: 'es2020',
  },
  server: {
    port: 3000,
  },
});
