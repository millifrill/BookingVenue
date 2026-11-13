describe('Navigation', () => {
  it('navigates to start page when clicking the menu logo', () => {
    cy.visit('/hitta-bokning');
    cy.get('header').getByRole('link', { name: 'BookingVenue.' }).click();
    cy.location('pathname').should('eq', '/');
  });

  it('navigates to start page when clicking the menu link Lokaler', () => {
    cy.visit('/hitta-bokning');
    cy.getByRole('navigation', { name: 'Huvudmeny' })
      .getByRole('link', { name: 'Lokaler' })
      .click();
    cy.location('pathname').should('eq', '/');
  });

  it('navigates to Hitta bokning page when clicking the menu link Hitta bokning', () => {
    cy.visit('/');
    cy.getByRole('navigation', { name: 'Huvudmeny' })
      .getByRole('link', { name: 'Hitta bokning' })
      .click();
    cy.location('pathname').should('eq', '/hitta-bokning');
  });

  it('navigates to Admin page when clicking the menu link Admin', () => {
    cy.visit('/');
    cy.get('header').getByRole('link', { name: 'Admin' }).click();
    cy.location('pathname').should('eq', '/admin/login');
  });

  context('Mobile and tablet view', () => {
    beforeEach(() => {
      cy.viewport(991, 800);
    });

    it('navigate via the menu and closes it', () => {
      cy.visit('/');
      cy.getByRole('button', { name: 'Visa meny' }).click();
      cy.getByRole('link', { name: 'Hitta bokning' }).click();
      cy.location('pathname').should('eq', '/hitta-bokning');
      cy.getByRole('navigation', { name: 'Huvudmeny' })
        .getByRole('link', { name: 'Hitta bokning', hidden: true })
        .should('not.be.visible');
    });
  });
});
