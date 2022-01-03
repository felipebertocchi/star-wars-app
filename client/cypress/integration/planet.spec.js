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
    cy.wait('@getPlanets', {
      timeout: 15000
    })
    cy.get('[data-test-id="card"]')
      .should('have.length', 12)
  });
  it("Should be able to access planet details", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/planetlist').as('getPlanets')
    cy.contains('Planetas').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/planet')
    cy.wait('@getPlanets', {timeout: 15000})
    cy.intercept('GET', Cypress.config().apiUrl + '/planetlist/*').as('getPlanetInfo')
    cy.contains('Ver más').click()
    cy.wait('@getPlanetInfo', {timeout: 25000})
    cy.get('[data-test-id="planet"]').within(() => {
      cy.get('[data-test-id="planet-name"]')
      cy.get('[data-test-id="planet-population"]')
      cy.get('[data-test-id="planet-residents"]')
      cy.get('[data-test-id="planet-id"]')
    });
  });
});