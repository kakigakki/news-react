import reactRefresh from '@vitejs/plugin-react-refresh';
import Unocss from 'unocss/vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    Unocss({
      theme: {
        colors: {
          primary: '#25b864',
          error: '#27AE60',
          warning: '#D68910',
          success: '#5499C7',
          base: '#f3f3f9',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@/': `${__dirname}/src/`,
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
