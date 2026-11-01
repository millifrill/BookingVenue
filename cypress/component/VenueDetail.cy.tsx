import { MemoryRouter } from 'react-router-dom';
import VenueDetail from '../../src/components/VenueDetail/VenueDetail';
import type { Venue } from '../../src/types/Venue';

const venue: Venue = {
  venueId: 1,
  cityId: 1,
  venueName: 'Testlokalen',
  cityName: 'Teststaden',
  street: 'Testgatan 123',
  postalNumber: '12345',
  description: 'En testlokal för testare som genomför tester i teststaden.',
  space: 20,
  capacity: 10,
  pricePerHour: 100,
  imageURL: 'https://images.pexels.com/photos/39225128/pexels-photo-39225128.jpeg',
  amenities: [{amenityId: 1, name: 'Wifi'}, {amenityId: 2, name: 'Projektor'}, {amenityId: 3, name: 'Whiteboard'}, {amenityId: 4, name: 'Ljudanläggning'}, {amenityId: 5, name: 'Bar'}, ],
};

const mountVenueDetail = (v: Venue = venue) => {
  cy.mount(
    <MemoryRouter>
        <VenueDetail venue={v} />
    </MemoryRouter>
  );
};

describe('VenueDetail', () => {
  it('Given a venue, When the component has rendered, Then the venue details should be displayed', () => {
    mountVenueDetail();

    cy.contains('h1', venue.venueName).should('be.visible');
    cy.contains(`${venue.street}, ${venue.postalNumber} ${venue.cityName}`).should('be.visible');
    cy.contains(`${venue.pricePerHour} kr/t`).should('be.visible');
    cy.contains(`Upp till ${venue.capacity} personer`).should('be.visible');
    cy.contains(`${venue.space} m²`).should('be.visible');
    cy.contains('p', venue.description).should('be.visible');
    cy.get('img').should('have.attr', 'src', venue.imageURL).and('have.attr', 'alt', venue.venueName);
  });
  it('Given a venue with amenities, When the component has rendered, Then the amenities should be displayed', () => {
    mountVenueDetail();

    venue.amenities.forEach((amenity) => {
      cy.contains('li', amenity.name).should('be.visible');
    });
  });
  it('Given a venue, When the component has rendered, Then the back link should point to /venue', () => {
    mountVenueDetail();

    cy.contains('a', 'Alla Lokaler').should('have.attr', 'href', '/venue');
  });
});