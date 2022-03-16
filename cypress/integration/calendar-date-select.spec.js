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

      for (let i = 24; i < 31; i++) {
        cy.contains(i).should('have.class', 'selected')
      }
    })
  })
})
