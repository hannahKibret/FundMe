/// <reference types="cypress"/>


describe("Login", () => {
    beforeEach(() => {
      cy.visit("/")
      cy.getByTestId("signbtn").click()
      cy.intercept('POST', '/api/auth').as('login-user')
      cy.getByTestId("log-link").click()
    })

    it("login with empty field", () => {
      cy.get("button").click()
      cy.wait('@login-user').its('response').should('deep.include', {
          statusCode: 400,
          body: '"email" is not allowed to be empty'
        })
      cy.getByTestId("em-err").should('be.visible')
      cy.getByTestId("pass-err").should('be.visible')
     })

     it("login with invalid email address and password", () => {
      cy.getByTestId("log-em").type("hananmohsin967088gmail.com")
      cy.getByTestId("log-pass").type("123456")
      cy.get("button").click()
      cy.wait('@login-user').its('response').should('deep.include', {
          statusCode: 400,
          body: '"email" must be a valid email'
        })
      cy.getByTestId("em-err").should('be.visible')
      cy.getByTestId("pass-err").should('be.visible')
     })

    it("login without email address", () => {
        cy.getByTestId("log-pass").type("12345678")
        cy.get("button").click()
        cy.wait('@login-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"email" is not allowed to be empty'
          })
        cy.getByTestId("em-err").should('be.visible')
    })

    it("login without password", () => {
        cy.getByTestId("log-em").type("hananmohsin967088@gmail.com")
        cy.get("button").click()
        cy.wait('@login-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"password" is not allowed to be empty'
          })
        cy.getByTestId("pass-err").should('be.visible')
    })

    it("login with incorrect email address or password", () => {
        cy.getByTestId("log-em").type("hananmohsin967088@gmail.com")
        cy.getByTestId("log-pass").type("12345679")
        cy.get("button").click()
        cy.wait('@login-user').its('response').should('deep.include', {
            statusCode: 400,
            body: 'Invalid email or password'

          })
        cy.getByTestId("inc-err").should('be.visible')
    })

    
    it("login with correct email address and password", () => {
        cy.getByTestId("log-em").type("hananmohsin967088@gmail.com")
        cy.getByTestId("log-pass").type("12345678")
        cy.get("button").click()
        cy.wait('@login-user').its('response').should('include', {
            // body:{
            //     loggedIn: true,
            //     firstName: 'Hanan'
            // },
            statusCode: 201
            
          }).and('have.property','headers')
          .then((headers) => {
            expect(headers).to.have.property('x-auth-token')
            cy.getByTestId("pro-avatar").should('have.text','H')
             
          })

          
          
          
      
    })

    it("logout", () => {
        cy.login()
        cy.getByTestId('logout-btn').click()
        cy.getByTestId("signbtn").should('be.visible')
      })


})