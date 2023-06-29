import { defineConfig } from 'vite';
// import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/

// const root = 'src';
export default defineConfig({
  plugins: [react()],
  root: 'src',
  // envDir: '../',
  // publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: '../dist',
  },
});
