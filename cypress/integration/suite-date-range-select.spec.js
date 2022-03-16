/// <reference types="cypress" />

describe('Given that I am any user', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('root_url') + 'suite/1')
  })

  context('When I access Suite detail page', () => {
    it('It should Suite detail page', () => {
      cy.contains('Suite Date Selector')
    })
  })
})
