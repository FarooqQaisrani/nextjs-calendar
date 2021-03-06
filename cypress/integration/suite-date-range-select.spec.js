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

    cy.intercept('GET', Cypress.env('root_url') + 'api/los-dates', {
      fixture: 'los.json',
    }).as('losAPI')

    cy.visit(Cypress.env('root_url') + 'suite/1')
  })

  context('When I access Suite detail page', () => {
    it('It should filter out unavailable dates', () => {
      cy.contains('Suite Date Selector')
      cy.wait('@unavailableDatesApi')
      cy.wait(2000)

      for (let i = 21; i < 23; i++) {
        cy.get(`[data-testid="date-2022-03-${i}"]`).should(
          'have.class',
          'unavailable'
        )
      }
    })
  })

  context('When I click on date', () => {
    it('It should show lock minimum length of stay', () => {
      cy.contains('Suite Date Selector')
      cy.wait('@losAPI')
      cy.wait(2000)

      cy.get('[data-testid="date-2022-03-24"]').click()
      cy.wait(500)
      cy.get('[data-testid="los-tip-2022-03-24"]').should('be.visible')

      for (let i = 24; i < 31; i++) {
        cy.get(`[data-testid="date-2022-03-${i}"]`).should(
          'have.class',
          'preselected'
        )
      }
    })
  })

  context('When I select start date', () => {
    it('It should disable disable all dates after first unavailable date', () => {
      cy.contains('Suite Date Selector')
      cy.wait('@unavailableDatesApi')
      cy.wait('@losAPI')
      cy.wait(2000)
      cy.get('[data-testid="btn-next-month"]').click()
      cy.get('[data-testid="date-2022-04-01"]').click()

      cy.get('[data-testid="los-tip-2022-04-01"]').should('be.visible')

      cy.get('[data-testid="date-2022-04-20"]').should(
        'have.class',
        'unavailable'
      )
    })
  })
})
