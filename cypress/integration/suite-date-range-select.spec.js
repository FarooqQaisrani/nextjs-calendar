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
    cy.intercept('GET', Cypress.env('root_url') + 'api/unavailable-dates', {
      fixture: 'unavailable-dates.json',
    }).as('unavailableDatesApi')
    cy.visit(Cypress.env('root_url') + 'suite/1')
  })

  context('When I access Suite detail page', () => {
    it('It should filter out unavailable dates', () => {
      cy.contains('Suite Date Selector')
      cy.wait('@unavailableDatesApi')
      cy.wait(2000)

      cy.get('[data-testid="date-2022-03-21"]')
        .should('have.class', 'unavailable')
        .should('have.class', 'unavailable')
      cy.get('[data-testid="date-2022-03-22"]')
        .should('have.class', 'unavailable')
        .should('have.class', 'unavailable')
      cy.get('[data-testid="date-2022-03-23"]')
        .should('have.class', 'unavailable')
        .should('have.class', 'unavailable')
    })
  })
})
