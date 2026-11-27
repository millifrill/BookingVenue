import AddVenue from '../../src/components/AddVenue/AddVenue';
import { VenueContext } from '../../src/context/VenueContext/useVenueContext';
import { AdminAuthContext } from '../../src/context/AdminContext/useAdminContext';
import type { Venue } from '../../src/types/Venue';
import { API_URL } from '../../src/utils/constants';

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

const VENUES = [
  makeVenue({ venueId: 1, cityId: 1, cityName: 'Göteborg' }),
  makeVenue({ venueId: 2, cityId: 2, cityName: 'Malmö' }),
];

const mountAddVenue = () => {
  cy.mount(
    <AdminAuthContext.Provider
      value={{
        isLoggedIn: true,
        setIsLoggedIn: cy.stub().as('setIsLoggedIn'),
        token: 'test-token',
        setToken: cy.stub().as('setToken'),
      }}>
      <VenueContext.Provider
        value={{
          allVenues: VENUES,
          errorMsg: null,
          setErrorMsg: cy.stub(),
          setAllVenues: cy.stub(),
          alert: null,
          setAlert: cy.stub(),
          reloadVenues: cy.stub().as('reloadVenues'),
        }}>
        <AddVenue />
      </VenueContext.Provider>
    </AdminAuthContext.Provider>,
  );
};

const fillAndSubmit = () => {
  cy.getByRole('textbox', { name: 'Namn' }).type('Havsutsikten');
  cy.getByRole('combobox', { name: 'Stad' }).select('Malmö');
  cy.getByRole('textbox', { name: 'Gatuadress' }).type('Storgatan 1');
  cy.getByRole('textbox', { name: 'Postnummer' }).type('21122');
  cy.getByRole('textbox', { name: 'Yta (m²)' }).type('120');
  cy.getByRole('textbox', { name: 'Max antal personer' }).type('40');
  cy.getByRole('textbox', { name: 'Pris per timme (kr)' }).type('900');
  cy.getByRole('button', { name: 'Lägg till lokal' }).click();
};

describe('AddVenue', () => {
  it('Given venues in two cities, When the form is shown, Then the city list offers each city once', () => {
    mountAddVenue();

    cy.get('select#venueCity option').then(($options) => {
      const labels = $options.toArray().map((option) => option.textContent);
      expect(labels).to.deep.equal(['Välj stad', 'Göteborg', 'Malmö']);
    });
  });

  it('Given a valid form, When the admin submits, Then the venue is posted, a confirmation is shown and the venue list is reloaded', () => {
    cy.intercept('POST', `${API_URL}/venue`, {
      statusCode: 201,
      body: { message: 'Venue created successfully', success: true },
    }).as('createVenue');
    mountAddVenue();

    fillAndSubmit();

    cy.wait('@createVenue').then((interception) => {
      expect(interception.request.headers['authorization']).to.equal(
        'Bearer test-token',
      );
      expect(interception.request.body).to.deep.equal({
        cityId: 2,
        name: 'Havsutsikten',
        street: 'Storgatan 1',
        postalNumber: '21122',
        description: '',
        space: 120,
        capacity: 40,
        pricePerHour: 900,
        imageURL: '',
      });
    });
    cy.contains('Lokalen har lagts till').should('be.visible');
    cy.get('@reloadVenues').should('have.been.calledOnce');
  });

  it('Given the server fails, When the admin submits, Then an error is shown and the venue list is not reloaded', () => {
    cy.intercept('POST', `${API_URL}/venue`, { statusCode: 500, body: {} }).as(
      'createVenue',
    );
    mountAddVenue();

    fillAndSubmit();

    cy.wait('@createVenue');
    cy.contains('Något gick fel, försök igen').should('be.visible');
    cy.get('@reloadVenues').should('not.have.been.called');
  });

  it('Given the token has expired, When the admin submits, Then the admin is logged out and told to log in again', () => {
    cy.intercept('POST', `${API_URL}/venue`, { statusCode: 403, body: {} }).as(
      'createVenue',
    );
    mountAddVenue();

    fillAndSubmit();

    cy.wait('@createVenue');
    cy.get('@setToken').should('have.been.calledWith', null);
    cy.get('@setIsLoggedIn').should('have.been.calledWith', false);
    cy.contains('Du är inte längre inloggad, logga in igen').should(
      'be.visible',
    );
    cy.get('@reloadVenues').should('not.have.been.called');
  });
});
