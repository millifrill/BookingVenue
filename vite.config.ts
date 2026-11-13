import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dns from 'dns';
import istanbul from 'vite-plugin-istanbul';

dns.setDefaultResultOrder('ipv4first');

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.ts', '.tsx'],
      requireEnv: false,
    }),
  ],
});
