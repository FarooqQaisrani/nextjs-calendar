/// <reference types="cypress" />

describe('Given that I am any user', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('root_url') + 'suite/1')
  })

  context('When I access homepage', () => {
    it('It should return homepage', () => {
      cy.contains('Suite Date Selector')
    })
  })
})
