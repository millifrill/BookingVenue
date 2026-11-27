import AddVenueForm from '../../src/components/AddVenueForm/AddVenueForm';

const CITIES = [
  { cityId: 1, name: 'Göteborg' },
  { cityId: 2, name: 'Malmö' },
];

const fillValidForm = () => {
  cy.getByRole('textbox', { name: 'Namn' }).type('Havsutsikten');
  cy.getByRole('combobox', { name: 'Stad' }).select('Malmö');
  cy.getByRole('textbox', { name: 'Gatuadress' }).type('Storgatan 1');
  cy.getByRole('textbox', { name: 'Postnummer' }).type('21122');
  cy.getByRole('textbox', { name: 'Yta (m²)' }).type('120');
  cy.getByRole('textbox', { name: 'Max antal personer' }).type('40');
  cy.getByRole('textbox', { name: 'Pris per timme (kr)' }).type('900');
};

const submit = () =>
  cy.getByRole('button', { name: 'Lägg till lokal' }).click();

describe('AddVenueForm', () => {
  beforeEach(() => {
    cy.mount(
      <AddVenueForm
        cities={CITIES}
        onAdd={cy.stub().as('onAdd')}
      />,
    );
  });

  it('Given the form is shown, When the page loads, Then the city list offers the given cities', () => {
    cy.get('select#venueCity option').then(($options) => {
      const labels = $options.toArray().map((option) => option.textContent);
      expect(labels).to.deep.equal(['Välj stad', 'Göteborg', 'Malmö']);
    });
  });

  it('Given an empty form, When the admin submits, Then each required field gets a clear error and nothing is added', () => {
    submit();

    cy.contains('Ange namn').should('be.visible');
    cy.contains('Välj en stad').should('be.visible');
    cy.contains('Ange gatuadress').should('be.visible');
    cy.contains('Postnummer måste vara fem siffror').should('be.visible');
    cy.contains('Ange en yta större än 0').should('be.visible');
    cy.contains('Ange ett antal personer större än 0').should('be.visible');
    cy.contains('Ange ett pris större än 0').should('be.visible');
    cy.get('@onAdd').should('not.have.been.called');
  });

  it('Given a postal number with letters, When the admin submits, Then an error about the postal number is shown', () => {
    fillValidForm();
    cy.getByRole('textbox', { name: 'Postnummer' }).clear().type('21a22');

    submit();

    cy.contains('Postnummer måste vara fem siffror').should('be.visible');
    cy.get('@onAdd').should('not.have.been.called');
  });

  it('Given a capacity of 0, When the admin submits, Then an error about the capacity is shown', () => {
    fillValidForm();
    cy.getByRole('textbox', { name: 'Max antal personer' }).clear().type('0');

    submit();

    cy.contains('Ange ett antal personer större än 0').should('be.visible');
    cy.get('@onAdd').should('not.have.been.called');
  });

  it('Given a valid form, When the admin submits, Then onAdd is called with the venue and numbers as numbers', () => {
    fillValidForm();
    cy.getByRole('textbox', { name: 'Beskrivning (valfritt)' }).type(
      'Nära havet',
    );
    cy.getByRole('textbox', { name: 'Bild-URL (valfritt)' }).type(
      'https://example.com/hav.jpg',
    );

    submit();

    cy.get('@onAdd').should('have.been.calledOnceWith', {
      cityId: 2,
      name: 'Havsutsikten',
      street: 'Storgatan 1',
      postalNumber: '21122',
      description: 'Nära havet',
      space: 120,
      capacity: 40,
      pricePerHour: 900,
      imageURL: 'https://example.com/hav.jpg',
    });
  });

  it('Given a valid form without description and image, When the admin submits, Then they are sent as empty strings', () => {
    fillValidForm();

    submit();

    cy.get('@onAdd').should('have.been.calledWithMatch', {
      description: '',
      imageURL: '',
    });
  });

  it('Given the form is shown, When the admin looks at the fields, Then description and image are marked as optional', () => {
    cy.getByRole('textbox', { name: 'Beskrivning (valfritt)' }).should(
      'be.visible',
    );
    cy.getByRole('textbox', { name: 'Bild-URL (valfritt)' }).should(
      'be.visible',
    );
  });

  it('Given the number fields, When the admin types letters or symbols, Then only the digits are kept', () => {
    cy.getByRole('textbox', { name: 'Yta (m²)' }).type('1a2-b.3');
    cy.getByRole('textbox', { name: 'Max antal personer' }).type('x4y0');
    cy.getByRole('textbox', { name: 'Pris per timme (kr)' }).type('-9e5');

    cy.getByRole('textbox', { name: 'Yta (m²)' }).should('have.value', '123');
    cy.getByRole('textbox', { name: 'Max antal personer' }).should(
      'have.value',
      '40',
    );
    cy.getByRole('textbox', { name: 'Pris per timme (kr)' }).should(
      'have.value',
      '95',
    );
  });
});
