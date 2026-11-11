// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands';

beforeEach(() => {
  cy.resetAndSeedDatabase();

  cy.intercept('GET', '**/venues*').as('getVenues');
  cy.intercept('GET', '**/venue/*').as('getVenue');
  cy.intercept('POST', '**/venue').as('createVenue');
  cy.intercept('PUT', '**/venue/*').as('updateVenue');
  cy.intercept('DELETE', '**/venue/*').as('deleteVenue');

  cy.intercept('GET', '**/bookings').as('getBookings');
  cy.intercept('GET', '**/booking/*').as('getBooking');
  cy.intercept('POST', '**/booking').as('createBooking');
  cy.intercept('PUT', '**/booking/*').as('updateBooking');
  cy.intercept('DELETE', '**/booking/*').as('deleteBooking');
});
