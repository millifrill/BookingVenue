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
  amenities: [
    { amenityId: 4, name: 'Bar' },
    { amenityId: 5, name: 'Kök' },
    { amenityId: 6, name: 'Tillgänglighetsanpassat' },
  ],
};

describe('VenueCard', () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <VenueCard venue={testVenue} />
      </MemoryRouter>,
    );
  });

  it('displays the correct venue information', () => {
    cy.getByRole('img', { name: testVenue.name })
      .should('have.attr', 'src', testVenue.imageURL)
      .and('be.visible');
    cy.getByRole('heading', { name: testVenue.name }).should('be.visible');
    cy.contains('span', testVenue.cityName).should('be.visible');
    cy.contains('span', testVenue.capacity).should('be.visible');
    cy.contains('span', testVenue.space).should('be.visible');
    cy.contains('span', testVenue.pricePerHour).should('be.visible');
    cy.contains(testVenue.description).should('be.visible');
  });

  it('does not display venue details not intended for the venue card', () => {
    cy.get("[data-cy='venue-card']").should('be.visible');
    cy.contains(testVenue.street).should('not.exist');
    cy.contains(testVenue.postalNumber).should('not.exist');
    cy.contains(testVenue.amenities[2].name).should('not.exist');
  });

  it('displays the correct text and styling on "Visa lokal" link and links to the correct venue details page', () => {
    cy.getByRole('link', { name: `Visa lokal ${testVenue.name}` })
      .should('have.text', 'Visa lokal')
      .and('have.class', 'btn')
      .and('have.class', 'btn-outline')
      .and('have.attr', 'href', `/venue/${testVenue.venueId}`)
      .and('be.visible');
  });
});
