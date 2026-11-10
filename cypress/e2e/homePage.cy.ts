describe('Booking Venue', () => {
  beforeEach(() => {
    cy.task('resetAndSeedDatabase');
    cy.visit('/');
  });

  it('visits the site BookingVenue', () => {
    cy.contains('BookingVenue').should('be.visible');
  });
});
