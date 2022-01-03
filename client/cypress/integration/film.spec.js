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
  it("Should be able to access film details", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/filmlist').as('getFilms')
    cy.contains('Películas').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/film')
    cy.wait('@getFilms', {timeout: 15000})
    cy.intercept('GET', Cypress.config().apiUrl + '/filmlist/*').as('getFilmInfo')
    cy.intercept('GET', Cypress.config().apiUrl + '/filmcharacters/*').as('getFilmCharacters')
    cy.contains('Ver más').click()
    cy.wait(['@getFilmInfo','@getFilmCharacters'], {timeout: 25000})
    cy.get('[data-test-id="film"]').within(() => {
      cy.get('[data-test-id="film-title"]')
      cy.get('[data-test-id="film-director"]')
      cy.get('[data-test-id="film-characters"]')
      cy.get('[data-test-id="film-id"]')
    });
  });
  it("Should be able to access film characters details", () => {
    cy.visit('/');
    cy.intercept('GET', Cypress.config().apiUrl + '/filmlist').as('getFilms')
    cy.contains('Películas').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/film')
    cy.wait('@getFilms', {timeout: 15000})
    cy.intercept('GET', Cypress.config().apiUrl + '/filmlist/*').as('getFilmInfo')
    cy.intercept('GET', Cypress.config().apiUrl + '/filmcharacters/*').as('getFilmCharacters')
    cy.contains('Ver más').click()
    cy.wait(['@getFilmInfo','@getFilmCharacters'], {timeout: 25000})

    cy.intercept('GET', Cypress.config().apiUrl + '/character?id=*').as('getCharacterInfo')
    cy.intercept('GET', Cypress.config().apiUrl + '/planet/*').as('getCharacterHW')
    cy.intercept('GET', Cypress.config().apiUrl + '/film/*').as('getCharacterFilms')
    cy.get('[data-test-id="film"]').within(() => {
      cy.get('[data-test-id="film-characters-link"]').first().click()
    });
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