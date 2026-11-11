describe('Booking Venue', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.wait('@getVenues');
  });

  it('visits the site BookingVenue', () => {
    cy.contains('BookingVenue').should('be.visible');
  });
});
