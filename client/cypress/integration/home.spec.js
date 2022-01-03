/// <reference types="Cypress" />

describe("Home", () => {
  beforeEach(() => {
    cy.login('fake@email.com', 'fakepassword123')
  })

  it("Should list 3 categories for browsing", () => {
    cy.visit('/');
    cy.url().should('equal', Cypress.config().baseUrl + '/')

    cy.get('[data-test-id="category-card"]')
      .should('have.length', 3)
  });

  it("Should be able to access each category from the app bar drawer", () => {
    cy.visit('/');
    cy.url().should('equal', Cypress.config().baseUrl + '/')

    cy.get('[data-test-id="appbar-menu"]').click()
    cy.get('[data-test-id="appbar-menu-characters"]').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/character')

    cy.get('[data-test-id="appbar-menu"]').click()
    cy.get('[data-test-id="appbar-menu-planets"]').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/planet')

    cy.get('[data-test-id="appbar-menu"]').click()
    cy.get('[data-test-id="appbar-menu-films"]').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/film')
  });
  it("Should be able to access user favorites from the app bar drawer", () => {
    cy.visit('/');
    cy.url().should('equal', Cypress.config().baseUrl + '/')

    cy.get('[data-test-id="appbar-menu"]').click()
    cy.get('[data-test-id="appbar-menu-favorites"]').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/favorite')
  });
  it("Should be able to access user favorites from user menu", () => {
    cy.visit('/');
    cy.get('[data-test-id="user-menu"]').click()
    cy.contains('Favorites').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/favorite')
  });
  it("Should return user to homepage when clicking star wars logo on navbar", () => {
    cy.visit('/');
    cy.contains('Planetas').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/planet')
    cy.get('[data-test-id="appbar-logo"]').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/')
  });
  it("Should allow user logout from user menu", () => {
    cy.visit('/');
    cy.get('[data-test-id="user-menu"]').click()
    cy.contains('Logout').click()
    cy.url().should('equal', Cypress.config().baseUrl + '/login')
  });
});