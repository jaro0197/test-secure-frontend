/// <reference types="cypress" />

import LoginPage from "../pages/LoginPage"
import { getRandomUser } from "../util/user"

const loginPage = new LoginPage()

describe('login page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8081')
    })

    it('should successfully login', () => {
        // given
        const user = getRandomUser()
        cy.register(user)

        // when
        loginPage.attemptLogin(user.username, user.password)

        // then
        cy.get('h1').should('contain.text', user.firstName)
    })

    it('should fail to login', () => {
        cy.get('[name=username]').type('wrong')
        cy.get('[name=password]').type('wrong')
        cy.get('.btn-primary').click()

        cy.get('.alert')
            .should('have.text', 'Invalid username/password supplied')
            .and('have.class', 'alert-danger')
    })

    it('should navigate to register page', () => {
        cy.get('a[href="/register"]').click()

        cy.url().should('contain', '/register')
        cy.get('h2').should('contain.text', 'Register')
    })

    it('should trigger frontend validation', () => {
        cy.get('.btn-primary').click()
        cy.get('.invalid-feedback').should('have.length', 2)
        cy.get('.invalid-feedback').eq(0).should('have.text', 'Required field length is 4 or more')
        cy.get('.invalid-feedback').eq(1).should('have.text', 'Required field length is 4 or more')
        cy.get('[name=username]').should('have.class', 'is-invalid')
        cy.get('[name=password]').should('have.class', 'is-invalid')
    })

})
