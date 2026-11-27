import { defineConfig } from 'cypress';
import { execSync } from 'node:child_process';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import codeCoverageTask from '@cypress/code-coverage/task';

export default defineConfig({
  viewportWidth: 1200,
  viewportHeight: 800,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    specPattern: 'cypress/component/**/*.cy.{ts,tsx}',
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
  e2e: {
    baseUrl: 'http://127.0.0.1:5173/',
    defaultCommandTimeout: 5000,
    specPattern: ['cypress/e2e/**/*.cy.{ts,tsx}', 'cypress/e2e/**/*.feature'],
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
            `psql -h ${process.env.PG_HOST} -U ${process.env.PG_USER} -d ${process.env.PG_DATABASE} -v ON_ERROR_STOP=1 -f ./backend/database/schema.sql`,
            { env: { ...process.env, PGPASSWORD: process.env.PG_PASSWORD } },
          );
          execSync(
            `psql -h ${process.env.PG_HOST} -U ${process.env.PG_USER} -d ${process.env.PG_DATABASE} -v ON_ERROR_STOP=1 -f ./backend/database/seed.sql`,
            { env: { ...process.env, PGPASSWORD: process.env.PG_PASSWORD } },
          );
          return null;
        },
      });
      codeCoverageTask(on, config);
      return config;
    },
  },
});
