import AdminLoginpage from '../../src/pages/AdminLoginPage';
import { MemoryRouter } from 'react-router-dom';
import { AdminAuthContext } from '../../src/context/AdminContext/useAdminContext';
import { API_URL } from '../../src/utils/constants';

const mountAdminLoginPage = () => {
  cy.mount(
    <MemoryRouter>
      <AdminAuthContext.Provider
        value={{
          isLoggedIn: false,
          setIsLoggedIn: cy.stub(),
          token: null,
          setToken: cy.stub(),
        }}>
        <AdminLoginpage />
      </AdminAuthContext.Provider>
    </MemoryRouter>,
  );
};

describe('AdminLogin', () => {
  it('shows login form', () => {
    mountAdminLoginPage();
    cy.contains('h1', 'Admin - Logga in').should('be.visible');
    cy.get('#adminPassword').should('have.value', '');
    cy.contains('button', 'Logga in').should('be.visible');
  });
  it('shows error when no password is entered', () => {
    mountAdminLoginPage();
    cy.contains('button', 'Logga in').click();
    cy.contains('Ange lösenord').should('be.visible');
  });
  it('shows error when login attempt with wrong password', () => {
    cy.intercept('POST', `${API_URL}/admin/login`, {
      body: { error: 'Wrong password', success: false },
      statusCode: 401,
    }).as('login');
    mountAdminLoginPage();

    cy.get('#adminPassword').type('12345');
    cy.contains('button', 'Logga in').click();
    cy.wait('@login');
    cy.contains('Fel lösenord').should('be.visible');
  });
});
