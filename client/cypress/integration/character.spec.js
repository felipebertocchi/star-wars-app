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
  it("Should be able to access character homeworld details", () => {
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
    cy.intercept('GET', Cypress.config().apiUrl + '/planetlist/*').as('getPlanetInfo')
    cy.get('[data-test-id="character"]').within(() => {
      cy.get('[data-test-id="character-homeworld-link"]').click()
    });
    cy.wait('@getPlanetInfo', {timeout: 25000})
    cy.get('[data-test-id="planet"]').within(() => {
      cy.get('[data-test-id="planet-name"]')
      cy.get('[data-test-id="planet-population"]')
      cy.get('[data-test-id="planet-residents"]')
      cy.get('[data-test-id="planet-id"]')
    });
  });
  it("Should be able to access character film details", () => {
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

    cy.intercept('GET', Cypress.config().apiUrl + '/filmlist/*').as('getFilmInfo')
    cy.intercept('GET', Cypress.config().apiUrl + '/filmcharacters/*').as('getFilmCharacters')
    cy.get('[data-test-id="character"]').within(() => {
      cy.get('[data-test-id="character-film-link"]').first().click()
    });
    cy.wait(['@getFilmInfo','@getFilmCharacters'], {timeout: 25000})
    cy.get('[data-test-id="film"]').within(() => {
      cy.get('[data-test-id="film-title"]')
      cy.get('[data-test-id="film-director"]')
      cy.get('[data-test-id="film-characters"]')
      cy.get('[data-test-id="film-id"]')
    });
  });
  
});