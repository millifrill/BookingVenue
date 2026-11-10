import { defineConfig } from 'cypress';
import { execSync } from 'node:child_process';

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
    setupNodeEvents(on) {
      on('task', {
        resetAndSeedDatabase() {
          execSync(
            'mysql --default-character-set=utf8mb4 -h 127.0.0.1 -u root BookingVenue_test -e "source ../backend/database/schema.sql"',
          );
          execSync(
            'mysql --default-character-set=utf8mb4 -h 127.0.0.1 -u root BookingVenue_test -e "source ../backend/database/seed.sql"',
          );
          return null;
        },
      });
    },
  },
});
