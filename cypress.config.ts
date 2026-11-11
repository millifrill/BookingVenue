import { defineConfig } from 'cypress';
import { execSync } from 'node:child_process';

process.loadEnvFile('./backend/.env');

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
  },
  e2e: {
    baseUrl: 'http://127.0.0.1:5173/',
    defaultCommandTimeout: 5000,
    viewportWidth: 1200,
    viewportHeight: 800,
    setupNodeEvents(on) {
      on('task', {
        resetAndSeedDatabase() {
          execSync(
            `mysql --default-character-set=utf8mb4 -h 127.0.0.1 -u root --password=${process.env.MYSQL_PASSWORD} BookingVenue -e "source ./backend/database/schema.sql"`,
          );
          execSync(
            `mysql --default-character-set=utf8mb4 -h 127.0.0.1 -u root --password=${process.env.MYSQL_PASSWORD} BookingVenue -e "source ./backend/database/seed.sql"`,
          );
          return null;
        },
      });
    },
  },
});
