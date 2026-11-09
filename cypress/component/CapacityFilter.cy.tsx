import CapacityFilter from '../../src/components/CapacityFilter/CapacityFilter.tsx';

const mountFilter = (value: number | null = null) => {
  const onChange = cy.stub().as('onChange');
  cy.mount(
    <CapacityFilter
      value={value}
      onChange={onChange}
    />,
  );
};

describe('CapacityFilter', () => {
  it('shows label and input for capacity', () => {
    mountFilter();

    cy.contains('label', 'Antal personer').should('be.visible');
    cy.get('input').should('be.visible');
  });
  it('shows the value in input', () => {
    mountFilter(1);

    cy.get('input').should('have.value', '1');
  });
  it('does go up 1 when the plus sign is clicked ', () => {
    mountFilter(10);

    cy.get('button[aria-label="Öka antal personer"]').click();
    cy.get('@onChange').should('have.been.calledWith', 11);
  });
  it('does go down 1 when the minus sign is clicked ', () => {
    mountFilter(10);

    cy.get('button[aria-label="Minska antal personer"]').click();
    cy.get('@onChange').should('have.been.calledWith', 9);
  });
  it('does not go below 1 when the minus sign is clicked ', () => {
    mountFilter(1);

    cy.get('button[aria-label="Minska antal personer"]').click();
    cy.get('@onChange').should('not.have.been.called');
  });
  it('does call onChange for positive input values', () => {
    mountFilter(null);

    cy.get('input').type('1');
    cy.get('@onChange').should('have.been.calledWith', 1);
  });
  it('does not allow input value of 0', () => {
    mountFilter(null);

    cy.get('input').type('0');
    cy.get('@onChange').should('not.have.been.called');
  });
  it('does not allow negative input value', () => {
    mountFilter(null);

    cy.get('input').type('-');
    cy.get('@onChange').should('not.have.been.called');
  });
});
