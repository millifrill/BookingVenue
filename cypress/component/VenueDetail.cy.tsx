import { MemoryRouter } from 'react-router-dom';
import VenueDetail from '../../src/components/VenueDetail/VenueDetail';
import type { Venue } from '../../src/types/Venue';
import { faker } from '@faker-js/faker';

const fakeVenue = (): Venue => ({ 
  venueId: faker.number.int({ min: 1, max: 1000 }),
  cityId: faker.number.int({ min: 1, max: 1000 }),
  venueName: faker.company.name(),
  cityName: faker.location.city(),
  street: faker.location.streetAddress(),
  postalNumber: faker.location.zipCode('#####'),
  description: faker.lorem.sentences(3),
  space: faker.number.int({ min: 1, max: 1000 }),
  capacity: faker.number.int({ min: 1, max: 1000 }),
  pricePerHour: faker.number.int({ min: 1, max: 1000 }),
  imageURL: faker.image.url(),
  amenities: [{amenityId: 1, name: 'Wifi'}, {amenityId: 2, name: 'Projektor'}, {amenityId: 3, name: 'Whiteboard'}, {amenityId: 4, name: 'Ljudanläggning'}, {amenityId: 5, name: 'Bar'}, ],
});

const mountVenueDetail = (v: Venue) => {
  cy.mount(
    <MemoryRouter>
        <VenueDetail venue={v} />
    </MemoryRouter>
  );
};

describe('VenueDetail', () => {
  it('Given a venue, When the component has rendered, Then the venue details should be displayed', () => {
    const venue = fakeVenue();
    mountVenueDetail(venue);

    cy.contains('h1', venue.venueName).should('be.visible');
    cy.contains(`${venue.street}, ${venue.postalNumber} ${venue.cityName}`).should('be.visible');
    cy.contains(`${venue.pricePerHour} kr/t`).should('be.visible');
    cy.contains(`Upp till ${venue.capacity} personer`).should('be.visible');
    cy.contains(`${venue.space} m²`).should('be.visible');
    cy.contains('p', venue.description).should('be.visible');
    cy.get('img').should('have.attr', 'src', venue.imageURL).and('have.attr', 'alt', venue.venueName);
  });
  it('Given a venue with amenities, When the component has rendered, Then the amenities should be displayed', () => {
    const venue = fakeVenue();
    mountVenueDetail(venue);

    venue.amenities.forEach((amenity) => {
      cy.contains('li', amenity.name).should('be.visible');
    });
  });
  it('Given a venue, When the component has rendered, Then the back link should point to /venue', () => {
    const venue = fakeVenue();
    mountVenueDetail(venue);

    cy.contains('a', 'Alla Lokaler').should('have.attr', 'href', '/venue');
  });
});