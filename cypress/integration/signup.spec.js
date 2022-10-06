/// <reference types="cypress"/>


describe("Register user", () => {
  const user={
    firstName: 'Kidist',
    lastName: 'Kebede',
    phone: '0912121212',
    email: 'kidistkebede@gmail.com',
    password: '12345678'
  }
    beforeEach(() => {
        cy.visit("/")
        cy.intercept('POST', '/api/users').as('signup-user')
        cy.getByTestId("signbtn").click()
        
    })

    it("signup with empty field", () => {
        cy.get("button").click()
        cy.wait('@signup-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"firstName" is not allowed to be empty'
          })
        cy.getByTestId("fir-err").should('be.visible')
        cy.getByTestId("las-err").should('be.visible')
        cy.getByTestId("ph-err").should('be.visible')
        cy.getByTestId("em-err").should('be.visible')
        cy.getByTestId("pass-err").scrollIntoView().should('be.visible')
        cy.getByTestId("re-err").scrollIntoView().should('be.visible')

    })

    it("signup with all invalid fields", () => {
      cy.getByTestId("sign-ph").type('094844884')
      cy.getByTestId("sign-em").type('kidistkebedegmail.com')
      cy.getByTestId("sign-pass").type('1234567')
      cy.getByTestId("sign-re").type('1234567')
      cy.get("button").click()
      cy.wait('@signup-user').its('response').should('deep.include', {
          statusCode: 400,
          body: '"firstName" is not allowed to be empty'
        })
      cy.getByTestId("fir-err").should('be.visible')
      cy.getByTestId("las-err").should('be.visible')
      cy.getByTestId("ph-err").should('be.visible')
      cy.getByTestId("em-err").should('be.visible')
      cy.getByTestId("pass-err").scrollIntoView().should('be.visible')

  })

    it("signup without first name", () => {
        cy.getByTestId("sign-last").type(user.lastName)
        cy.getByTestId("sign-ph").type(user.phone)
        cy.getByTestId("sign-em").type(user.email)
        cy.getByTestId("sign-pass").type(user.password)
        cy.getByTestId("sign-re").type(user.password)
        cy.get("button").click()
        cy.wait('@signup-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"firstName" is not allowed to be empty'
          })
        cy.getByTestId("fir-err").should('be.visible')
    })

    it("signup without last name", () => {
        cy.getByTestId("sign-first").type(user.firstName)
        cy.getByTestId("sign-ph").type(user.phone)
        cy.getByTestId("sign-em").type(user.email)
        cy.getByTestId("sign-pass").type(user.password)
        cy.getByTestId("sign-re").type(user.password)
        cy.get("button").click()
        cy.wait('@signup-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"lastName" is not allowed to be empty'
          })
        cy.getByTestId("las-err").should('be.visible')
    })

    it("signup without phone number", () => {
        cy.getByTestId("sign-first").type(user.firstName)
        cy.getByTestId("sign-last").type(user.lastName)
        cy.getByTestId("sign-em").type(user.email)
        cy.getByTestId("sign-pass").type(user.password)
        cy.getByTestId("sign-re").type(user.password)
        cy.get("button").click()
        cy.wait('@signup-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"phoneNumber" is not allowed to be empty'

          })
        cy.getByTestId("ph-err").should('be.visible')
    })

    it("signup with existing phone number", () => {
      cy.getByTestId("sign-first").type(user.firstName)
      cy.getByTestId("sign-last").type(user.lastName)
      cy.getByTestId("sign-ph").type('0988766554')
      cy.getByTestId("sign-em").type(user.email)
      cy.getByTestId("sign-pass").type(user.password)
      cy.getByTestId("sign-re").type(user.password)
      cy.get("button").click()
      cy.wait('@signup-user').its('response').should('deep.include', {
          statusCode: 400,
          body: 'Phone number already exists'

        })
      cy.getByTestId("ph-err").should('be.visible')
  })

    it("signup without email address", () => {
        cy.getByTestId("sign-first").type(user.firstName)
        cy.getByTestId("sign-last").type(user.lastName)
        cy.getByTestId("sign-ph").type(user.phone)
        cy.getByTestId("sign-pass").type(user.password)
        cy.getByTestId("sign-re").type(user.password)
        cy.get("button").click()
        cy.wait('@signup-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"email" is not allowed to be empty'

          })
        cy.getByTestId("em-err").should('be.visible')
    })

    it("signup with invalid email address ", () => {
        cy.getByTestId("sign-first").type(user.firstName)
        cy.getByTestId("sign-last").type(user.lastName)
        cy.getByTestId("sign-ph").type(user.phone)
        cy.getByTestId("sign-em").type('kidistkebedegmail.com')
        cy.getByTestId("sign-pass").type(user.password)
        cy.getByTestId("sign-re").type(user.password)
        cy.get("button").click()
        cy.wait('@signup-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"email" must be a valid email'

          })
        cy.getByTestId("em-err").should('be.visible')
    })

    it("signup with existing email address", () => {
      cy.getByTestId("sign-first").type(user.firstName)
      cy.getByTestId("sign-last").type(user.lastName)
      cy.getByTestId("sign-ph").type(user.phone)
      cy.getByTestId("sign-em").type('hananmohsin967088@gmail.com')
      cy.getByTestId("sign-pass").type(user.password)
      cy.getByTestId("sign-re").type(user.password)
      cy.get("button").click()
      cy.wait('@signup-user').its('response').should('deep.include', {
          statusCode: 400,
          body: 'Email address already exists'

        })
      cy.getByTestId("em-err").should('be.visible')
  })

    it("signup without password", () => {
        cy.getByTestId("sign-first").type(user.firstName)
        cy.getByTestId("sign-last").type(user.lastName)
        cy.getByTestId("sign-ph").type(user.phone)
        cy.getByTestId("sign-em").type(user.email)
        cy.getByTestId("sign-re").type(user.password)
        cy.get("button").click()
        cy.wait('@signup-user').its('response').should('deep.include', {
            statusCode: 400,
            body: '"password" is not allowed to be empty'

          })
        cy.getByTestId("pass-err").should('be.visible')
        cy.getByTestId("re-err").should('be.visible')
    })

    it("signup without confirming password", () => {
        cy.getByTestId("sign-first").type(user.firstName)
        cy.getByTestId("sign-last").type(user.lastName)
        cy.getByTestId("sign-ph").type(user.phone)
        cy.getByTestId("sign-em").type(user.email)
        cy.getByTestId("sign-pass").type(user.password)
        cy.get("button").click()
        cy.getByTestId("re-err").should('be.visible')
    })

    it("signup without matching password", () => {
        cy.getByTestId("sign-first").type(user.firstName)
        cy.getByTestId("sign-last").type(user.lastName)
        cy.getByTestId("sign-ph").type(user.phone)
        cy.getByTestId("sign-em").type(user.email)
        cy.getByTestId("sign-pass").type(user.password)
        cy.getByTestId("sign-re").type("12345668")
        cy.get("button").click()
        cy.getByTestId("re-err").should('be.visible')
    })

    
    it("signup with all required fields", () => {
        
        
        cy.getByTestId("sign-first").type(user.firstName)
        cy.getByTestId("sign-last").type(user.lastName)
        cy.getByTestId("sign-ph").type(user.phone)
        cy.getByTestId("sign-em").type(user.email)
        cy.getByTestId("sign-pass").type(user.password)
        cy.getByTestId("sign-re").type(user.password)
        cy.get("button").click()
        cy.wait('@signup-user').its('response').should('include', {
            // body:{
            //     firstName: 'Kidist',
            //     lastName: 'Kebede'
            // },
            statusCode: 201
            
          }).and('have.property','headers')
          .then((headers) => {
            expect(headers).to.have.property('x-auth-token')
             
          })
          cy.getByTestId("pro-avatar").should('have.text','K')
             
    })


})