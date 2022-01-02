/// <reference types="Cypress" />

describe("Characters", () => {
  beforeEach(() => {
    cy.login('fake@email.com', 'fakepassword123')
  })
  
  it("Should display cards in Characters category", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/character').as('getCharacters')
    cy.contains('Personajes').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/character')
    cy.wait('@getCharacters', {timeout: 15000})
    cy.get('[data-test-id="card"]')
    .should('have.length', 12)
  });
  it("Should be able to access character details", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/character').as('getCharacters')
    cy.contains('Personajes').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/character')
    cy.wait('@getCharacters', {timeout: 15000})
    cy.intercept('GET', Cypress.config().apiUrl + '/character?id=*').as('getCharacterInfo')
    cy.intercept('GET', Cypress.config().apiUrl + '/planet/*').as('getCharacterHW')
    cy.intercept('GET', Cypress.config().apiUrl + '/film/*').as('getCharacterFilms')
    cy.contains('Ver más').click()
    cy.wait(['@getCharacterInfo','@getCharacterHW','@getCharacterFilms'], {timeout: 25000})
    cy.intercept('GET', Cypress.config().apiUrl + '/favorite/*').as('getUserFavorites')
    cy.get('[data-test-id="character"]').within(() => {
      cy.get('[data-test-id="character-name"]')
      cy.get('[data-test-id="character-homeworld"]')
      cy.get('[data-test-id="character-films"]')
      cy.wait('@getUserFavorites', {timeout: 15000})
      cy.get('[data-test-id="favorite-button"]')
    });
  });
  
});