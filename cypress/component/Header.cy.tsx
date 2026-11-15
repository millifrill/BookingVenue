import { MemoryRouter } from 'react-router-dom';
import Header from '../../src/components/Header/Header';

describe('Header', () => {
  beforeEach(() => {
    cy.mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  });

  it('shows the logo', () => {
    cy.getByRole('link', { name: 'BookingVenue.' })
      .should('be.visible')
      .and('have.attr', 'href', '/');
  });

  it('shows the main menu', () => {
    cy.getByRole('navigation', { name: 'Huvudmeny' }).should('be.visible');
  });

  it('does not show the menu button', () => {
    cy.getByRole('button', { name: 'Visa meny', hidden: true }).should(
      'not.be.visible',
    );
  });

  it('displays the correct text on menu links and links point to the correct pages', () => {
    cy.getByRole('link', { name: 'Lokaler' })
      .should('have.attr', 'href', '/')
      .and('be.visible');
    cy.getByRole('link', { name: 'Hitta bokning' })
      .should('have.attr', 'href', '/hitta-bokning')
      .and('be.visible');
    cy.getByRole('link', { name: 'Admin' })
      .should('have.attr', 'href', '/admin/login')
      .and('be.visible');
  });

  it('marks the current page link as active', () => {
    cy.getByRole('link')
      .filter('[aria-current="page"]')
      .should('have.text', 'Lokaler');
  });

  context('Mobile and tablet view', () => {
    beforeEach(() => {
      cy.viewport(991, 800);
    });

    it('shows the menu button', () => {
      cy.getByRole('button', { name: 'Visa meny' }).should('be.visible');
    });

    it('opens the menu with links, when the menu button is clicked', () => {
      cy.getByRole('navigation', { name: 'Huvudmeny', hidden: true }).should(
        'not.be.visible',
      );
      cy.getByRole('button', { name: 'Visa meny' })
        .should('be.visible')
        .click();
      cy.getByRole('navigation', { name: 'Huvudmeny' }).should('be.visible');
    });
  });
});
