import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dns from 'dns';
import istanbul from 'vite-plugin-istanbul';

dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
  plugins: [
    react(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'cypress', '**/*.cy.tsx'],
      extension: ['.ts', '.tsx'],
    }),
  ],
});
