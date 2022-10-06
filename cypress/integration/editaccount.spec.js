/// <reference types="cypress"/>


describe("Edit account", () => {
   
    beforeEach(() => {
        cy.login()
        cy.getByTestId("pro-avatar").click()
        cy.intercept('GET', '/api/users/me', { fixture: 'user.json' }).as('get-user')
        cy.intercept('PUT', '/api/users/me').as('edit-user')
        cy.getByTestId("ed-acc").click()
        cy.wait('@get-user')
    })

    it("getting profile of the user", () => {
        cy.getByTestId("ed-first").should('have.value',"Hanan")
        cy.getByTestId("ed-last").should('have.value',"Mohsin")
        cy.getByTestId("ed-ph").should('have.value',"0988766554")
        cy.getByTestId("ed-em").should('have.value',"hananmohsin967088@gmail.com")
        cy.get('button').contains('Edit').click()
      
    })

    it("edit account without first name", () => {
        cy.getByTestId("ed-first").clear({ force: true })
        cy.get("button[type='submit']").click()
        cy.wait('@edit-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"firstName" is not allowed to be empty'
          })
        cy.getByTestId("first-err").should('be.visible')
    })

    it("edit account without last name", () => {
        cy.getByTestId("ed-last").clear({ force: true })
        cy.get("button[type='submit']").click()
        cy.wait('@edit-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"lastName" is not allowed to be empty'
          })
        cy.getByTestId("las-err").should('be.visible')
    })

    it("edit account without phone number", () => {
        cy.getByTestId("ed-ph").clear({ force: true })
        cy.get("button[type='submit']").click()
        cy.wait('@edit-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"phoneNumber" is not allowed to be empty'
          })
        cy.getByTestId("ph-err").should('be.visible')
    })

    

    it("edit with email address with incorrect format", () => {
        cy.getByTestId("ed-em").clear({ force: true }).type('hananmohsingmail.com')
        cy.get("button[type='submit']").contains('Edit').click()
        cy.wait('@edit-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"email" must be a valid email'

          })
         cy.getByTestId("err-em").should('be.visible')
    })

    

    it("edit account without email address", () => {
        cy.getByTestId("ed-em").clear({ force: true })
        cy.get("button[type='submit']").click()
        cy.wait('@edit-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"email" is not allowed to be empty'
          })
        cy.getByTestId("err-em").should('be.visible')
    })

    it("edit with password less than 8 characters", () => {
        cy.getByTestId("ed-pass").type('1234567')
        cy.get("button[type='submit']").contains('Edit').click()
        cy.getByTestId("err-pass").should('be.visible')
    })

    it("edit without confirming password", () => {
        cy.getByTestId("ed-pass").type('12345678')
        cy.get("button[type='submit']").contains('Edit').click()
        cy.getByTestId("err-repass").should('be.visible')
    })

    it("edit account(change first name and last name)", () => {
        cy.getByTestId("ed-first").clear({ force: true }).type('Hanann')
        cy.getByTestId("ed-last").clear({ force: true }).type('Mohsinn')
        cy.get("button[type='submit']").click()
        cy.wait('@edit-user').its('response.body').should('include', {
            firstName: 'Hanann',
            lastName: 'Mohsinn'
            
          })
       
       
    })

    it('closing edit account page', () => { 
        cy.get('.xbtn').click()
        cy.getByTestId("ed-acc").should('be.visible')
        
      })

    

    

    


})