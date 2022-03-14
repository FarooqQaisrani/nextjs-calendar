/// <reference types="cypress" />

describe('Given that I am any user', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('root_url'))
  })

  context('When I access homepage', () => {
    it('It should have Calendar element', () => {
      cy.get('[data-testid="calendar"]').should('exist')
    })
  })
})
