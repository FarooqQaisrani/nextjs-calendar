/// <reference types="cypress" />

describe('Given that I am any user', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('root_url'))
  })

  context('When I access homepage', () => {
    it('It should have Calendar element', () => {
      cy.get('[data-testid="calendar"]').should('exist')
    })
    it('It should have Month', () => {
      cy.get('[data-testid="month"]').contains('March')
    })
    it('It should have Dates', () => {
      cy.get('[data-testid^="date-"]').should('have.length.above', 0)
    })
  })
})
