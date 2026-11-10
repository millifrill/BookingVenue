declare namespace Cypress {
  interface Chainable {
    resetDatabase(): Chainable<null>;
  }
}
