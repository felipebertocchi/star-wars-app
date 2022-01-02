/// <reference types="Cypress" />

describe("Films", () => {
  beforeEach(() => {
    cy.login('fake@email.com', 'fakepassword123')
  })

  it("Should display cards in Films category", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/filmlist').as('getFilms')
    cy.contains('Películas').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/film')
    cy.wait('@getFilms', {timeout: 15000})
    cy.get('[data-test-id="card"]')
    .should('have.length', 6)
  });
  
});