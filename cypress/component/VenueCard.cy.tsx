import React from 'react';
import VenueCard from '../../src/components/VenueCard/VenueCard';
import { Venue } from '../../src/types/Venue';
import { MemoryRouter } from 'react-router-dom';

const testVenue: Venue = {
  venueId: 3,
  cityId: 3,
  name: 'Festvåningen Hamnen',
  street: 'Hamngatan 5',
  postalNumber: '21121',
  description:
    'Festlokal med bar, kök och dansgolv för upp till 80 gäster. Lokalen passar utmärkt för bröllop, födelsedagar och företagsfester. Med eget kök och egen bar kan du enkelt ordna både mat och dryck på plats.',
  space: 150,
  capacity: 80,
  pricePerHour: 1200,
  imageURL:
    'https://images.pexels.com/photos/17294774/pexels-photo-17294774.jpeg',
  cityName: 'Malmö',
  amenities: [],
};

describe('<VenueCard />', () => {
  it('displays the venue name', () => {
    cy.mount(
      <MemoryRouter>
        <VenueCard venue={testVenue} />
      </MemoryRouter>,
    );
    cy.contains('h3', testVenue.name).should('be.visible');
  });
});
