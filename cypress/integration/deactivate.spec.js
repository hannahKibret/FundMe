/// <reference types="cypress"/>


describe("Deactivate acount", () => {
   
    beforeEach(() => {
        cy.visit("/")
        cy.getByTestId("signbtn").click()
        cy.getByTestId("log-link").click()
        cy.getByTestId("log-em").type("naomitibebe@gmail.com")
        cy.getByTestId("log-pass").type("12345678")
        cy.intercept('POST', '/api/auth').as('login-user')
        cy.get("button").click()
        cy.wait('@login-user')
        cy.getByTestId("pro-avatar").click()
        cy.intercept('GET', '/api/users/me').as('get-user')
        cy.getByTestId("ed-acc").click()
        cy.wait('@get-user')
    })


    it("deactivate account", () => {
        cy.intercept('PUT', '/api/users/me').as('edit-user')
        cy.getByTestId("deac-btn").click()
        cy.wait('@edit-user').its('response.body').should('include', {
            isDeactivated: true
          })
        cy.getByTestId("signbtn").should('be.visible')
    })


    

    


})