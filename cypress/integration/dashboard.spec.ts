// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('dashboard', () => {
  it('shows account form when add account button is clicked', () => {
    cy.visit('http://localhost:3000')

    cy.get('[value=debit]').should('not.exist')
    cy.contains('Add account').click()
    cy.get('[value=debit]').should('exist')
  })

  it('adds account when submit button is clicked', () => {
    cy.visit('http://localhost:3000')

    cy.contains('Add account').click()
    cy.get('[value=debit]').click()
    cy.get('#balance').type('5000')
    cy.get('#bank').type('scotia')
    cy.get('#card-number').type('5010')
    cy.get('#submit')
      .should('exist')
      .click()

    cy.get('[value=debit]').should('not.exist')
    cy.contains('scotia').should('exist')
  })
})
