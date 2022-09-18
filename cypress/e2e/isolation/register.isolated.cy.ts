/// <reference types="cypress" />

import RegisterPage from "../../pages/RegisterPage"
import MockRegister from "../../stubs/MockRegister"
import { getRandomUser } from "../../util/userProvider"

describe('Register page isolated tests', () => {
    const registerPage = new RegisterPage()

    beforeEach(() => {
        cy.visit('http://localhost:8081/register')
    })

    it('should successfully register', () => {
        // given
        MockRegister.mockSuccessfulRegister()

        // when
        registerPage.attemptRegister(getRandomUser())

        // then
        cy.get('.alert-success').should('contain.text', 'Registration successful')
    })

    it('should show user already in use error message', () => {
        // given
        const message = "Username is already in use"
        MockRegister.mockFailedRegister(message)

        // when
        registerPage.attemptRegister(getRandomUser())

        // then
        cy.get('.alert-danger').should('have.text', message)
    })

    it('should display loading indicator', () => {
        // given
        MockRegister.mockDelayedRegister()

        // when
        registerPage.attemptRegister(getRandomUser())

        // then
        cy.get('.btn-primary .spinner-border').should('be.visible')
    })

    it('should open login page after clicking cancel', () => {
        // when
        registerPage.clickCancel()

        // then
        cy.url().should('contain', '/login')
    })

})
