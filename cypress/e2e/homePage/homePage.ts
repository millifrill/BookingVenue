import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the HomePage', () => {
  cy.visit('/');
});

Then('I should see a list of 10 venue items', () => {
  cy.get("[data-cy='venue-card']").should('be.visible').and('have.length', 10);
});

When(
  'I click on {string} button on {string} venue item',
  (button: string, venueName: string) => {
    cy.wait('@getVenues');
    cy.getByRole('link', { name: `${button} ${venueName}` }).click();
  },
);

Then(
  'I should be redirected to a page with more information about {string} venue',
  () => {
    cy.location('pathname').should('eq', '/venue/1');
  },
);
