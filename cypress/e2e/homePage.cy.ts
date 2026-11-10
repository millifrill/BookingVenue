describe('Booking Venue', () => {
  beforeEach(() => {
    cy.resetAndSeedDatabase();
    cy.visit('/');
  });

  it('visits the site BookingVenue', () => {
    cy.contains('BookingVenue').should('be.visible');
  });
});
