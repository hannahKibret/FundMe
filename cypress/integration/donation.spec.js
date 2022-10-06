/// <reference types="cypress"/>


describe("Make a donation", () => {

    beforeEach(() => {
        cy.intercept('GET','/api/fundraisers/popular').as('funds')
        cy.login()
        
        cy.wait('@funds')
        cy.get('div.container').first().contains('View Details').click()
       
        cy.get('.donate').click()
        cy.intercept('POST','**/api/donations/*').as('donation')
        
    })

    it("make a donation without entering the amount", () => {
    
        cy.get('button#donate-btn').click();
        cy.wait('@donation').its('response').should('deep.include', {
            statusCode: 400,
            body: '"amount" is required'
          })
        cy.getByTestId("a-err").should('be.visible')
      

    })

    it("make a donation with amount less than 50", () => {
        cy.getByTestId('d-amount').type(30)
        cy.get('button#donate-btn').click();
        cy.wait('@donation').its('response').should('deep.include', {
            statusCode: 400,
            body: '"amount" must be greater than or equal to 50'
          })
        cy.getByTestId("a-err").should('be.visible')
      

    })

    it("make a donation with 'keep me anonymous' unchecked", () => {
        cy.getByTestId('d-amount').type(100)
        cy.getByTestId('d-pay').check()
        cy.get('button#donate-btn').click();
        cy.wait('@donation').its('response.body').should('include', {
            isAnonymous: false,
            amount: 100,
            paymentMethod: 'paypal'
          })
      

    })

    it("make a donation with 'keep me anonymous' checked", () => {
        cy.getByTestId('d-amount').type(100)
        cy.getByTestId('d-pay').check()
        cy.getByTestId('d-anon').check()
        cy.get('button#donate-btn').click();
        cy.wait('@donation').its('response.body').should('include', {
            isAnonymous: true,
            amount: 100,
            paymentMethod: 'paypal'
          })
      
    })

    it("donation made should be added into donations list", () => {
        cy.getByTestId('d-amount').type(2000)
        cy.getByTestId('d-pay').check()
        cy.intercept('GET','**/api/fundraisers/id/*').as('fund')
        cy.get('button#donate-btn').click();
        cy.wait('@donation').wait('@fund')
        cy.get('.donated-container').first().getByTestId('amt-don').first().should('have.text','Donated 2000birr')
    })


    it('closing donation page', () => {
        cy.get('.xbtn').click()
        cy.get('.donate').should('be.visible')
        
      })


})