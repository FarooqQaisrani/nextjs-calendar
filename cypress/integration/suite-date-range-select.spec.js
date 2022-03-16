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

describe('Given that I am any user', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('root_url') + 'suite/1')
    cy.intercept('api/unavailable-dates', {
      fixture: 'unavailable-dates.json',
    }).as('unavailableDatesApi')
  })

  context('When I access Suite detail page', () => {
    it('It should filter out unavailable dates', () => {
      cy.contains('Suite Date Selector')
      cy.wait('@unavailableDatesApi')
      for (let i = 21; i < 24; i++) {
        cy.contains(i).should('have.class', 'unavailable')
      }
    })
  })
})
