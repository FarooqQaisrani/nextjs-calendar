/// <reference types="cypress" />

describe('Given that I am any user', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('root_url'))
  })

  context('When I access Date Range Selector', () => {
    it('I can select FROM date', () => {
      cy.contains('24').click()
      cy.contains('24').should('have.class', 'selected')
    })

    it('I can select END date', () => {
      cy.contains('24').click()
      cy.contains('30').click()

      cy.contains('24').should('have.class', 'selected')
      cy.contains('30').should('have.class', 'selected')
    })
  })
})
