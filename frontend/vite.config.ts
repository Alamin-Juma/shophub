import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
    port: 5173, // or whatever port you want to use
  },
});
