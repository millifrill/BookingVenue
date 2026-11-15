import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { nextWeekIso } from '../../support/dates.ts';

Given('I am on the page of the venue {string}', (venueName: string) => {
  cy.visit('/');
  cy.wait('@getVenues');
  cy.get(`a[aria-label="Visa lokal ${venueName}"]`).click();
  cy.wait('@getVenue');
});

When(
  'I choose a date next week from {string} to {string}',
  (from: string, to: string) => {
    cy.get('#bookingDate').type(nextWeekIso());
    cy.get('#bookingFrom').select(from);
    cy.get('#bookingTo').select(to);
    cy.contains('button', 'Boka').click();
  },
);

When(
  'I confirm the booking as {string} {string}',
  (firstName: string, lastName: string) => {
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.contains('button', 'Bekräfta bokning').click();
    cy.wait('@createBooking');
  },
);

Then('I should see that the booking is confirmed', () => {
  cy.contains('Bokningen är bekräftad').should('be.visible');
});

Then('I should see a booking number', () => {
  cy.contains('strong', /^[0-9A-F]{8}$/).should('be.visible');
});
