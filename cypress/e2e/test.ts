import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I visit BookingVenue site', () => {
  cy.visit('/');
  cy.wait('@getVenues');
});

Then('I should see a navbar', () => {
  cy.get('header[role="navigation"]')
    .should('be.visible')
    .and('contain', 'BookingVenue');
});
