/// <reference types="cypress" />

describe('Given that I am any user', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('root_url'))
  })

  context('When I access homepage', () => {
    it('It should have Month Navigation', () => {
      cy.contains('24').click()
      cy.contains('24').should('have.class', 'selected')
    })
  })
})
