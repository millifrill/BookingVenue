describe('NotFoundPage', () => {
  it('shows 404 for unknown address', () => {
    cy.visit('/abc');
    cy.url().should('include', '/404');
    cy.contains('h1', '404 - Sidan hittades inte').should('be.visible');
  });

  it('shows 404 when the venue does not exist', () => {
    cy.visit('/venue/12345');
    cy.wait('@getVenue');
    cy.url().should('include', '/404');
    cy.contains('h1', '404 - Sidan hittades inte').should('be.visible');
  });
});
