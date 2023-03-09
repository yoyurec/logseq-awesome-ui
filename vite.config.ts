import { defineConfig } from 'vite';

const name = 'awesomeUi';

// https://vitejs.dev/config/
export default defineConfig({
  base: '',
  build: {
    sourcemap: true,
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        entryFileNames: `assets/${name}-[hash].js`,
        chunkFileNames: `assets/chunks/${name}-[hash].js`,
        assetFileNames: `assets/${name}-[hash].[ext]`,
      }
    }
  }
});
