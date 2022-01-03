/// <reference types="Cypress" />

describe("Search bar", () => {
  beforeEach(() => {
    cy.login('fake@email.com', 'fakepassword123')
  })
  it("Should display results after typing in the search bar", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/character').as('getSearchResults')
    cy.get('[data-test-id="searchbar-input"]').click()
    cy.wait('@getSearchResults', {timeout: 25000})
    cy.get('[data-test-id="searchbar-input"]').type('Lu')
    cy.get('[data-test-id="searchbar-result"]').should('have.length.at.least', 1)
  });
  it("Should redirect to character after clicking search bar result", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/character').as('getSearchResults')
    cy.get('[data-test-id="searchbar-input"]').click()
    cy.wait('@getSearchResults', {timeout: 25000})
    cy.get('[data-test-id="searchbar-input"]').type('Darth Vader')
    cy.intercept('GET', Cypress.config().apiUrl + '/character?id=*').as('getCharacterInfo')
    cy.intercept('GET', Cypress.config().apiUrl + '/planet/*').as('getCharacterHW')
    cy.intercept('GET', Cypress.config().apiUrl + '/film/*').as('getCharacterFilms')
    cy.get('[data-test-id="searchbar-result"]').click()
    cy.intercept('GET', Cypress.config().apiUrl + '/favorite/*').as('getUserFavorites')
    cy.wait(['@getCharacterInfo','@getCharacterHW','@getCharacterFilms'], {timeout: 25000})
    cy.get('[data-test-id="character"]').within(() => {
      cy.get('[data-test-id="character-name"]')
      cy.get('[data-test-id="character-homeworld"]')
      cy.get('[data-test-id="character-films"]')
      cy.get('[data-test-id="character-id"]')
      cy.wait('@getUserFavorites', {timeout: 25000})
      cy.get('[data-test-id="favorite-button"]')
    });
  });
  
});