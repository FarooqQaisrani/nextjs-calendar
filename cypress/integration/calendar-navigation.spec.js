/// <reference types="cypress" />

describe('Given that I am any user', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('root_url'))
  })

  context('When I access homepage', () => {
    it('It should have Month Navigation', () => {
      cy.get('[data-testid="btn-next-month"]').should('exist')
      cy.get('[data-testid="btn-prev-month"]').should('exist')
      cy.get('[data-testid="btn-next-month"]').click()
      cy.contains('April')
    })
  })
})
