import { mount } from 'cypress/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../src/styles/tokens.css';
import '../../src/index.css';
import '../../src/styles/global.css';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
    }
  }
}

Cypress.Commands.add('mount', mount);
