import AreaFilter from '../../src/components/AreaFilter/AreaFilter.tsx';

const ERROR_MESSAGE = 'Ange en yta större än 0';

const mountFilter = (value: number | null = null) => {
  cy.mount(
    <AreaFilter
      value={value}
      onChange={cy.stub().as('onChange')}
    />,
  );
};

describe('AreaFilter', () => {
  it('Given no chosen area, When the filter is shown, Then it has a "Yta (m²)" label and an empty field', () => {
    mountFilter();

    cy.get('label').should('contain.text', 'Yta (m²)');
    cy.get('input').should('have.value', '');
  });

  it('Given 50 as the chosen area, When the filter is shown, Then the field shows 50', () => {
    mountFilter(50);

    cy.get('input').should('have.value', '50');
  });

  it('Given the filter, When the visitor types 8, Then onChange is called with 8', () => {
    mountFilter();

    cy.get('input').type('8');

    cy.get('@onChange').should('have.been.calledOnceWith', 8);
  });

  it('Given a chosen area, When the visitor clears the field, Then onChange is called with null', () => {
    mountFilter(50);

    cy.get('input').clear();

    cy.get('@onChange').should('have.been.calledOnceWith', null);
  });

  it('Given a valid area, When the filter is shown, Then no error message is shown', () => {
    mountFilter(50);

    cy.get('input').should('be.visible');
    cy.contains(ERROR_MESSAGE).should('not.exist');
  });

  it('Given 0 as the chosen area, When the filter is shown, Then an error message is shown', () => {
    mountFilter(0);

    cy.contains(ERROR_MESSAGE).should('be.visible');
  });

  it('Given a negative area, When the filter is shown, Then an error message is shown', () => {
    mountFilter(-5);

    cy.contains(ERROR_MESSAGE).should('be.visible');
  });
});
