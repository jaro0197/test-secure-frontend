
/// <reference types="cypress" />

import { getRandomString } from "../util/random"

describe('Register page', () => {
    beforeEach(() => {
      cy.visit('/register')
    })
  
    it('C2130 should successfully register', () => {
        cy.get('[name=username]').type(getRandomString())
        cy.get('[name=password]').type(getRandomString())
        cy.get('[name=firstName]').type(getRandomString())
        cy.get('[name=lastName]').type(getRandomString())
        cy.get('[name=email]').type(`${getRandomString()}@ocado.com`)
        cy.get('.btn-primary').click()
        cy.get('.alert').should('contain.text', 'Registration successful')
    })
  })
  