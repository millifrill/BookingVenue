import BookingCard from '../../src/components/BookingCard/BookingCard.tsx';
import type { FoundBooking } from '../../src/components/BookingCard/BookingCard.tsx';

const BOOKING: FoundBooking = {
  bookingId: 'K7P2XQ9M',
  venueId: 1,
  venueName: 'Salongen på Söder',
  venueImageURL: 'https://example.com/salongen.jpg',
  firstName: 'Anna',
  lastName: 'Svensson',
  startTime: new Date(2026, 9, 23, 10, 0).toISOString(),
  endTime: new Date(2026, 9, 23, 13, 0).toISOString(),
};

describe('BookingCard', () => {
  beforeEach(() => {
    cy.mount(<BookingCard booking={BOOKING} />);
  });

  it('Given a booking, When the card is shown, Then it shows the name of the venue', () => {
    cy.contains('h3', 'Salongen på Söder').should('be.visible');
  });

  it('Given a booking, When the card is shown, Then it shows the booking number', () => {
    cy.contains('K7P2XQ9M').should('be.visible');
  });

  it('Given a booking, When the card is shown, Then it shows the date and the time', () => {
    cy.contains('Fre 23 okt.').should('be.visible');
    cy.contains('10:00–13:00').should('be.visible');
  });

  it('Given a booking, When the card is shown, Then it shows the image of the venue', () => {
    cy.get('img')
      .should('have.attr', 'src', BOOKING.venueImageURL)
      .and('have.attr', 'alt', 'Salongen på Söder');
  });
});
