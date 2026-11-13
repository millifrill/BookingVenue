import { defineConfig } from 'cypress';
import { execSync } from 'node:child_process';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import registerCodeCoverageTasks from '@cypress/code-coverage/task';

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
    setupNodeEvents(on, config) {
      registerCodeCoverageTasks(on, config);
      return config;
    },
  },
  e2e: {
    baseUrl: 'http://127.0.0.1:5173/',
    defaultCommandTimeout: 5000,
    viewportWidth: 1200,
    viewportHeight: 800,
    specPattern: [
      'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
      'cypress/e2e/**/*.feature',
    ],
    async setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });
      on('file:preprocessor', bundler);

      await addCucumberPreprocessorPlugin(on, config);

      process.loadEnvFile('./backend/.env');

      on('task', {
        resetAndSeedDatabase() {
          execSync(
            `mysql --default-character-set=utf8mb4 -h 127.0.0.1 -u root --password=${process.env.MYSQL_PASSWORD} BookingVenue < ./backend/database/schema.sql`,
          );
          execSync(
            `mysql --default-character-set=utf8mb4 -h 127.0.0.1 -u root --password=${process.env.MYSQL_PASSWORD} BookingVenue < ./backend/database/seed.sql`,
          );
          return null;
        },
      });
      registerCodeCoverageTasks(on, config);
      return config;
    },
  },
});
