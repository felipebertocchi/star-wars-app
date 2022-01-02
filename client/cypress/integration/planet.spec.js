/// <reference types="Cypress" />

describe("Planets", () => {
  beforeEach(() => {
    cy.login('fake@email.com', 'fakepassword123')
  })
  
  it("Should display cards in Planets category", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/planetlist').as('getPlanets')
    cy.contains('Planetas').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/planet')
    cy.wait('@getPlanets', {timeout: 15000})
    cy.get('[data-test-id="card"]')
    .should('have.length', 12)
  });
  
});