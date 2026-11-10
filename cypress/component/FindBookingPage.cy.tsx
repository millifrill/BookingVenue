import { MemoryRouter } from 'react-router-dom';
import FindBookingPage from '../../src/pages/FindBookingPage.tsx';

const API = 'http://localhost:3000/api/booking';

const BOOKING = {
  bookingId: 'K7P2XQ9M',
  venueId: 1,
  venueName: 'Salongen på Söder',
  venueImageURL: 'https://example.com/salongen.jpg',
  firstName: 'Anna',
  lastName: 'Svensson',
  startTime: new Date(2026, 9, 23, 10, 0).toISOString(),
  endTime: new Date(2026, 9, 23, 13, 0).toISOString(),
};

const NOT_FOUND = 'Ingen bokning hittades';
const EMPTY_FIELD = 'Ange ett bokningsnummer';

const mountPage = () => {
  cy.mount(
    <MemoryRouter>
      <FindBookingPage />
    </MemoryRouter>,
  );
};

describe('FindBookingPage', () => {
  it('Given the page, When it is shown, Then it has a heading, a field for the booking number and a search button', () => {
    mountPage();

    cy.contains('h1', 'Hitta bokning').should('be.visible');
    cy.contains('label', 'Bokningsnummer').should('be.visible');
    cy.get('input').should('have.value', '');
    cy.contains('button', 'Sök').should('be.visible');
  });

  it('Given a correct booking number, When the visitor searches, Then the venue, the date and the time of the booking are shown', () => {
    cy.intercept('GET', `${API}/K7P2XQ9M`, BOOKING).as('getBooking');
    mountPage();

    cy.get('input').type('K7P2XQ9M');
    cy.contains('button', 'Sök').click();

    cy.wait('@getBooking');
    cy.contains('h3', 'Salongen på Söder').should('be.visible');
    cy.contains('Fre 23 okt.').should('be.visible');
    cy.contains('10:00–13:00').should('be.visible');
    cy.contains(NOT_FOUND).should('not.exist');
  });

  it('Given a booking number with spaces around it, When the visitor searches, Then the spaces are ignored', () => {
    cy.intercept('GET', `${API}/K7P2XQ9M`, BOOKING).as('getBooking');
    mountPage();

    cy.get('input').type('  K7P2XQ9M  ');
    cy.contains('button', 'Sök').click();

    cy.wait('@getBooking');
    cy.contains('h3', 'Salongen på Söder').should('be.visible');
  });

  it('Given a wrong booking number, When the visitor searches, Then the message "Ingen bokning hittades" is shown', () => {
    cy.intercept('GET', `${API}/WRONG123`, {
      statusCode: 404,
      body: { error: 'Booking not found', success: false },
    }).as('getBooking');
    mountPage();

    cy.get('input').type('WRONG123');
    cy.contains('button', 'Sök').click();

    cy.wait('@getBooking');
    cy.contains(NOT_FOUND).should('be.visible');
    cy.get('h3').should('not.exist');
  });

  it('Given an empty field, When the visitor searches, Then an error message is shown and no search is made', () => {
    cy.intercept('GET', `${API}/*`, BOOKING).as('getBooking');
    mountPage();

    cy.contains('button', 'Sök').click();

    cy.contains(EMPTY_FIELD).should('be.visible');
    cy.get('@getBooking.all').should('have.length', 0);
  });

  it('Given a booking that is shown, When the visitor searches for a wrong number, Then the old booking is removed', () => {
    cy.intercept('GET', `${API}/K7P2XQ9M`, BOOKING);
    cy.intercept('GET', `${API}/WRONG123`, { statusCode: 404, body: {} });
    mountPage();
    cy.get('input').type('K7P2XQ9M');
    cy.contains('button', 'Sök').click();
    cy.contains('h3', 'Salongen på Söder').should('be.visible');

    cy.get('input').clear().type('WRONG123');
    cy.contains('button', 'Sök').click();

    cy.contains(NOT_FOUND).should('be.visible');
    cy.get('h3').should('not.exist');
  });
});
