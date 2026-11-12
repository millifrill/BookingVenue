declare namespace Cypress {
  interface Chainable {
    resetAndSeedDatabase(): Chainable<null>;
  }
}
