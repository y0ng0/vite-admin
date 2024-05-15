import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacyPlugin from '@vitejs/plugin-legacy';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };
  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
    },
    build: {
      target: 'es2015'
    },
    base: process.env.VITE_BASE_URL,
    server: {
      host: '127.0.0.1',
      port: 5174,
      proxy: {
        // 将带有'/api'前缀的请求重定向到目标服务器，同时移除'/api'前缀
        '/api': {
          target: loadEnv(mode,'./').VITE_SERVER_API_BASE_URL,
          changeOrigin: true, // 如果目标服务器是跨域的，需要这个选项
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
  });
};
