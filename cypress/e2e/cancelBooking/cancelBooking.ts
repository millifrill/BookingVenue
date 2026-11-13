import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I have a booking number {string}', (bookingId: string) => {
  cy.wrap(bookingId).as('bookingId');
});

Given('The booking was cancelled', () => {
  cy.get('@bookingId').then((bookingId) => {
    cy.request('DELETE', `http://localhost:3000/api/booking/${bookingId}`);
  });
});

When('I search for the booking number', () => {
  cy.visit('/hitta-bokning');
  cy.get('@bookingId').then((bookingId) => {
    cy.get('input').type(bookingId);
  });
  cy.contains('button', 'Sök').click();
  cy.wait('@getBooking');
});

When('I click {string}', (label: string) => {
  cy.contains('button', label).click();
  cy.wait('@deleteBooking');
});

Then('I should see confirmation {string}', (message: string) => {
  cy.contains(message).should('be.visible');
});

Then('I should not see the venue {string}', (venueName: string) => {
  cy.contains('h3', venueName).should('not.exist');
});
