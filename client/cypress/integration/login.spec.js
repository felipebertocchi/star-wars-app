/// <reference types="Cypress" />

describe("Login", () => {
  it("Should show user login page upon first entering", () => {
    cy.visit('/');
    cy.url().should('equal', Cypress.config().baseUrl + '/login')
  });

  it("Should allow user login and redirect to home page", () => {
    cy.visit('/login');
    cy.get('form').within(() => {
      cy.get('input[name="email"]').type('fake@email.com').should('have.value', 'fake@email.com')
      cy.get('input[name="password"]').type('fakepassword123').should('have.value', 'fakepassword123')
      // cy.root().submit()
      cy.intercept('POST', Cypress.config().apiUrl + '/login').as('postLogin')
      cy.get('[data-test-id="sign-in"]').click()
      cy.wait('@postLogin').its('response.statusCode').should('eq', 200)
      cy.url().should('equal', Cypress.config().baseUrl + '/')
    });
  });
});