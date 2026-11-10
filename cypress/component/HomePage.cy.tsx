import { MemoryRouter } from 'react-router-dom';
import HomePage from '../../src/pages/HomePage.tsx';
import { VenueContext } from '../../src/context/VenueContext/useVenueContext.ts';
import type { Venue } from '../../src/types/Venue.ts';

const makeVenue = (overrides: Partial<Venue>): Venue => ({
  venueId: 1,
  cityId: 1,
  name: 'Lokal',
  cityName: 'Göteborg',
  street: 'Storgatan 1',
  postalNumber: '41101',
  description: 'En lokal',
  space: 50,
  capacity: 10,
  pricePerHour: 500,
  imageURL: 'https://example.com/lokal.jpg',
  amenities: [],
  ...overrides,
});

const VENUES: Venue[] = [
  makeVenue({
    venueId: 1,
    name: 'Havsutsikten',
    cityId: 1,
    cityName: 'Göteborg',
    space: 200,
    capacity: 100,
  }),
  makeVenue({
    venueId: 2,
    name: 'Kajplatsen',
    cityId: 1,
    cityName: 'Göteborg',
    space: 40,
    capacity: 20,
  }),
  makeVenue({
    venueId: 3,
    name: 'Torgsalen',
    cityId: 2,
    cityName: 'Malmö',
    space: 150,
    capacity: 60,
  }),
  makeVenue({
    venueId: 4,
    name: 'Hörnrummet',
    cityId: 3,
    cityName: 'Stockholm',
    space: 25,
    capacity: 8,
  }),
];

const mountHomePage = (venues: Venue[] = VENUES) => {
  cy.mount(
    <MemoryRouter>
      <VenueContext.Provider
        value={{ allVenues: venues, errorMsg: null, setErrorMsg: cy.stub() }}>
        <HomePage />
      </VenueContext.Provider>
    </MemoryRouter>,
  );
};

const shownVenueNames = () =>
  cy.get('h3').then(($titles) => $titles.toArray().map((el) => el.textContent));

describe('HomePage filters', () => {
  it('Given all venues, When no filter is chosen, Then every venue is shown', () => {
    mountHomePage();

    shownVenueNames().should('deep.equal', [
      'Havsutsikten',
      'Kajplatsen',
      'Torgsalen',
      'Hörnrummet',
    ]);
  });

  it('Given venues in three cities, When the page is shown, Then the city filter offers each city once', () => {
    mountHomePage();

    cy.get('select#cityFilter option').then(($options) => {
      const labels = $options.toArray().map((option) => option.textContent);
      expect(labels).to.deep.equal([
        'Alla städer',
        'Göteborg',
        'Malmö',
        'Stockholm',
      ]);
    });
  });

  it('Given venues in different cities, When the visitor picks "Göteborg", Then only venues in Göteborg are shown', () => {
    mountHomePage();

    cy.get('select#cityFilter').select('Göteborg');

    shownVenueNames().should('deep.equal', ['Havsutsikten', 'Kajplatsen']);
  });

  it('Given a chosen city, When the visitor picks "Alla städer", Then every venue is shown again', () => {
    mountHomePage();
    cy.get('select#cityFilter').select('Malmö');

    cy.get('select#cityFilter').select('Alla städer');

    cy.get('h3').should('have.length', 4);
  });

  it('Given venues of different sizes, When the visitor enters 100 as area, Then only venues with at least 100 m² are shown', () => {
    mountHomePage();

    cy.get('input#areaFilter').type('100');

    shownVenueNames().should('deep.equal', ['Havsutsikten', 'Torgsalen']);
  });

  it('Given venues with different capacity, When the visitor enters 50 people, Then only venues for at least 50 people are shown', () => {
    mountHomePage();

    cy.get('input#capacityFilter').clear().type('50');

    shownVenueNames().should('deep.equal', ['Havsutsikten', 'Torgsalen']);
  });

  it('Given several filters, When city and area are chosen, Then only venues matching both are shown', () => {
    mountHomePage();

    cy.get('select#cityFilter').select('Göteborg');
    cy.get('input#areaFilter').type('100');

    shownVenueNames().should('deep.equal', ['Havsutsikten']);
  });

  it('Given several filters, When city, area and capacity are chosen, Then only venues matching all three are shown', () => {
    mountHomePage();

    cy.get('select#cityFilter').select('Göteborg');
    cy.get('input#areaFilter').type('30');
    cy.get('input#capacityFilter').clear().type('50');

    shownVenueNames().should('deep.equal', ['Havsutsikten']);
  });

  it('Given filters that no venue matches, When the filters are applied, Then a message says there are no venues', () => {
    mountHomePage();

    cy.get('input#areaFilter').type('1000');

    cy.contains('Det finns inga lokaler att visa.').should('be.visible');
  });
});
