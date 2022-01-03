/// <reference types="Cypress" />

import favorites from "../fixtures/userFavorites.json"

describe("User Favorites", () => {
  beforeEach(() => {
    cy.login('fake@email.com', 'fakepassword123')
  })
  it("Should be able to access and list user favorites", () => {
    cy.visit('/');
    cy.get('[data-test-id="user-menu"]').click()
    cy.intercept('GET', Cypress.config().apiUrl + '/favorite/*', favorites).as('getUserFavorites')
    cy.contains('Favorites').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/favorite')
    cy.wait(['@getUserFavorites'], {timeout: 25000})
    cy.get('[data-test-id="card"]').should('have.length', favorites.length)
  });
  it("Should show message and button when user has no favorites", () => {
    cy.visit('/');
    cy.get('[data-test-id="user-menu"]').click()
    cy.intercept('GET', Cypress.config().apiUrl + '/favorite/*', []).as('getUserFavorites')
    cy.contains('Favorites').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/favorite')
    cy.wait(['@getUserFavorites'], {timeout: 25000})
    cy.get('[data-test-id="card"]').should('have.length', [])
    cy.get('[data-test-id="no-favorites"]').within(() => {
      cy.get('h4').should('have.text','No se han asignado favoritos todavia...')
      cy.get('button').should('have.text','Explorar personajes')
    })
  });
  it("Should redirect to characters when clicking explore characters button", () => {
    cy.visit('/');
    cy.get('[data-test-id="user-menu"]').click()
    cy.intercept('GET', Cypress.config().apiUrl + '/favorite/*', []).as('getUserFavorites')
    cy.contains('Favorites').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/favorite')
    cy.wait(['@getUserFavorites'], {timeout: 25000})
    cy.get('[data-test-id="card"]').should('have.length', [])
    cy.get('[data-test-id="no-favorites"]').within(() => {
      cy.get('button').should('have.text','Explorar personajes').click()
    })
    cy.url().should('equal', Cypress.config().baseUrl + '/character')
  });
  it("Should be able to add a character to favorites, then confirm it's in user favorites", () => {
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
      cy.intercept('POST', Cypress.config().apiUrl + '/favorite').as('postUserFavorite')
      cy.get('[data-test-id="favorite-button"]').click()
    });
    cy.wait(['@postUserFavorite'], {timeout: 25000}).its('response.statusCode').should('eq', 200)
    cy.get('[data-test-id="user-menu"]').click()
    cy.intercept('GET', Cypress.config().apiUrl + '/favorite/*').as('getUserFavorites')
    cy.contains('Favorites').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/favorite')
    cy.wait(['@getUserFavorites'], {timeout: 25000})
    cy.get('[data-test-id="card"]').should('have.length.at.least', 1)
  });
  it("Should be able to remove a character to favorites, then confirm it's not in user favorites", () => {
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
      cy.intercept('DELETE', Cypress.config().apiUrl + '/favorite').as('deleteUserFavorite')
      cy.get('[data-test-id="unfavorite-button"]').click()
    });
    cy.wait(['@deleteUserFavorite'], {timeout: 25000}).its('response.statusCode').should('eq', 200)
    cy.get('[data-test-id="user-menu"]').click()
    cy.intercept('GET', Cypress.config().apiUrl + '/favorite/*').as('getUserFavorites')
    cy.contains('Favorites').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/favorite')
    cy.wait(['@getUserFavorites'], {timeout: 25000})
    cy.get('[data-test-id="card"]').should('have.length', 0)
    cy.get('[data-test-id="no-favorites"]').within(() => {
      cy.get('h4').should('have.text','No se han asignado favoritos todavia...')
      cy.get('button').should('have.text','Explorar personajes')
    });
  });
});