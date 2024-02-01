import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import pkg from './package.json';

const noAttr = () => {
  return {
    name: 'no-attribute',
    transformIndexHtml(html) {
      return html.replace(`type="module" crossorigin`, `type="module"`);
    },
  };
};

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: './',
    build: {
      outDir: './dist',
      emptyOutDir: false,
      minify: false,
      rollupOptions: {
        input: {
          app: './index.html',
        },
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`,
        },
      },
    },
    plugins: [react(), svgr(), noAttr()],
    resolve: {
      alias: [{ find: '~', replacement: path.resolve(__dirname, 'src') }],
    },
    define: {
      SERVER_IP: JSON.stringify(process.env.SERVER_IP),
      SERVER_PORT: JSON.stringify(process.env.SERVER_PORT),
    },
    server: {
      port: 8090,
      host: '0.0.0.0',
      proxy: {
        '/service/v1': {
          target: `http://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`,
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/service\/v1/, ''),
        },
        '/service': {
          target: `ws://${process.env.SERVER_IP}:${process.env.SERVER_PORT}`,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  });
};
