import CityFilter from '../../src/components/CityFilter/CityFilter.tsx';

const CITIES = [
  { cityId: 1, name: 'Göteborg' },
  { cityId: 2, name: 'Malmö' },
  { cityId: 3, name: 'Stockholm' },
  { cityId: 4, name: 'Uppsala' },
];

const mountFilter = (value: number | null = null, cities = CITIES) => {
  const onChange = cy.stub().as('onChange');
  cy.mount(
    <CityFilter
      cities={cities}
      value={value}
      onChange={onChange}
    />,
  );
};

describe('CityFilter', () => {
  it('Given a list of cities, When the filter is shown, Then it has a "Stad" label and "Alla städer" selected', () => {
    mountFilter();

    cy.contains('label', 'Stad').should('be.visible');
    cy.get('select').find('option:selected').should('have.text', 'Alla städer');
  });

  it('Given a list of cities, When the filter is shown, Then "Alla städer" comes first followed by every city', () => {
    mountFilter();

    cy.get('select option').then(($options) => {
      const labels = [...$options].map((option) => option.textContent);
      expect(labels).to.deep.equal([
        'Alla städer',
        ...CITIES.map((city) => city.name),
      ]);
    });
  });

  it('Given Malmö as the chosen city, When the filter is shown, Then "Malmö" is selected', () => {
    mountFilter(2);

    cy.get('select').find('option:selected').should('have.text', 'Malmö');
  });

  it('Given the filter, When the visitor picks "Göteborg", Then onChange is called with the cityId of Göteborg', () => {
    mountFilter();

    cy.get('select').select('Göteborg');

    cy.get('@onChange').should('have.been.calledOnceWith', 1);
  });

  it('Given a chosen city, When the visitor picks "Alla städer", Then onChange is called with null', () => {
    mountFilter(2);

    cy.get('select').select('Alla städer');

    cy.get('@onChange').should('have.been.calledOnceWith', null);
  });

  it('Given no cities, When the filter is shown, Then only "Alla städer" is offered', () => {
    mountFilter(null, []);

    cy.get('select option')
      .should('have.length', 1)
      .and('have.text', 'Alla städer');
  });
});
