// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="Cypress" />

describe('dashboard', () => {
  describe('add account flow', () => {
    it('shows account form when add account button is clicked', () => {
      cy.visit('http://localhost:3000')

      cy.get('[data-cy=add-account-form]').should('not.exist')
      cy.contains('Add account').click()
      cy.get('[data-cy=add-account-form]').should('exist')
    })

    it('adds account when submit button is clicked', () => {
      cy.visit('http://localhost:3000')

      cy.contains('Add account').click()
      cy.get('[data-cy=account_type_debit]').click()
      cy.get('[data-cy=account_balance]').type('5000')
      cy.get('[data-cy=account_bank]').type('scotia')
      cy.get('[data-cy=account_card-number]').type('5010')
      cy.get('[data-cy=add-account-form_submit]')
        .should('exist')
        .click()

      cy.get('[data-cy=add-account-form]').should('not.exist')
      cy.contains('scotia').should('exist')
    })
  })

  describe('add transaction flow', () => {
    it('shows transaction form when add transaction button is clicked', () => {
      cy.visit('http://localhost:3000')

      cy.get('[data-cy=add-transaction-form]').should('not.exist')
      cy.contains('Add transaction').click()
      cy.get('[data-cy=add-transaction-form]').should('exist')
    })
  })
})
