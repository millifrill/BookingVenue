import { nextWeekIso } from '../support/dates.ts';

const VENUE_NAME = 'Konferensrum Ljuset';
const API_BOOKING = 'http://localhost:3000/api/booking';

const openVenuePage = () => {
  cy.visit('/');
  cy.wait('@getVenues');
  cy.get(`a[aria-label="Visa lokal ${VENUE_NAME}"]`).click();
  cy.wait('@getVenue');
};

const fillBooking = (date: string, from: string, to: string) => {
  cy.get('#bookingDate').type(date);
  cy.get('#bookingFrom').select(from);
  cy.get('#bookingTo').select(to);
  cy.contains('button', 'Boka').click();
};

const confirmBooking = (firstName: string, lastName: string) => {
  cy.get('#firstName').type(firstName);
  cy.get('#lastName').type(lastName);
  cy.contains('button', 'Bekräfta bokning').click();
};

describe('Booking', () => {
  it('Given a venue, When the visitor books a time, Then the booking is confirmed and can be found with "Hitta bokning"', () => {
    openVenuePage();

    fillBooking(nextWeekIso(), '10:00', '12:00');
    confirmBooking('Anna', 'Svensson');

    cy.wait('@createBooking').its('response.statusCode').should('eq', 201);
    cy.contains('Bokningen är bekräftad').should('be.visible');
    cy.contains('strong', /^[0-9A-F]{8}$/).then(($number) => {
      const bookingNumber = $number.text();

      cy.get('.modal-content').contains('a', 'Hitta bokning').click();
      cy.get('input').type(bookingNumber);
      cy.contains('button', 'Sök').click();

      cy.wait('@getBooking');
      cy.contains('h3', VENUE_NAME).should('be.visible');
      cy.contains('10:00–12:00').should('be.visible');
    });
  });

  it('Given a time that is already booked, When another visitor books the same time, Then a message says that the venue is already booked', () => {
    const date = nextWeekIso();
    cy.request('POST', API_BOOKING, {
      venueId: 1,
      firstName: 'Karin',
      lastName: 'Lindqvist',
      startTime: `${date} 10:00:00`,
      endTime: `${date} 12:00:00`,
    });
    openVenuePage();

    fillBooking(date, '11:00', '13:00');
    confirmBooking('Anna', 'Svensson');

    cy.wait('@createBooking').its('response.statusCode').should('eq', 409);
    cy.contains('Lokalen är redan bokad under den tiden').should('be.visible');
    cy.contains('Bokningen är bekräftad').should('not.exist');
  });
});
