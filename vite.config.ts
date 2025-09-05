import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 3005,
      proxy:
        process.env.NODE_ENV === 'development'
          ? {
              '/api': {
                target: env.VITE_API_BASE_URL,
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, ''),
                // configure: (proxy) => {
                //   proxy.on('proxyReq', (proxyReq, req) => {
                //     const completeUrl = `${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`;
                //     console.log('Proxying request:', req.url, 'to:', completeUrl);
                //   });
                // },
              },
            }
          : undefined,
    },
    base: env.VITE_PUBLIC_BASE_URL || '/',
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'), 
        },
        output: {
          entryFileNames: (chunkInfo) => {
            return 'assets/[name]-0[hash].js'; 
          },
          chunkFileNames: (chunkInfo) => {
            return 'assets/[name]-0[hash].js';
          },
          assetFileNames: 'assets/[name]-0[hash][extname]',
        },
      },
    },
  };
});
