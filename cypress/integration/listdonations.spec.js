/// <reference types="cypress"/>


describe("View all fundraisers as an admin", () => {
    beforeEach(() => {
      cy.loginAsAnAdmin()  
    })


    it('getting donations made to fundraisers from the server', () => {   
         cy.intercept('GET','/api/donations/',req => {
          delete req.headers['if-none-match']
         }).as('dons')
        cy.getByTestId("don-view").click()
        cy.wait('@dons')
          .its('response')
          .should('deep.include', {
            statusCode: 200,
            statusMessage: 'OK'
          })
          .and('have.property', 'body') 
          .then((body) => {
            expect(body).to.be.an('array')
          })
      })

      it('getting donations made to fundraisers from the server with invalid token', () => {   
        cy.intercept('GET','/api/donations/',req => {
         delete req.headers['if-none-match']
         req.headers['x-auth-token'] = 'fjkdjfkjkfkjdf'
        }).as('dons')
       cy.getByTestId("don-view").click()
       cy.wait('@dons')
         .its('response')
         .should('deep.include', {
           statusCode: 400,
           body: 'Invalid token'
         })

     })

      const headers = {
        'access-control-allow-origin': Cypress.config('baseUrl'),
        'Access-Control-Allow-Credentials': 'true'
      }
  
      const mergeResponse = (options = {}) => {
        return Object.assign({}, { headers }, options)
      }

      it('getting donations from fixture and checking its length', () => {
        cy.intercept('GET','/api/donations/',mergeResponse({ fixture: 'donations.json' })).as('dons')
        cy.getByTestId("don-view").click()
        cy.wait('@dons').its('response.headers').should('include', headers) 
        cy.get('div.donated-container').should('have.length', 3)
      })

      it('checking the value of the html elements that displays the donor,amount and date of donation', () => {
        cy.intercept('GET','/api/donations/',mergeResponse({ fixture: 'donations.json' })).as('dons')
        cy.getByTestId("don-view").click()
        cy.wait('@dons').its('response.headers').should('include', headers) 
        cy.get('div.donated-container').first()
                                        .getByTestId('don-user').first().should('have.text','Naomi Tibebe')
                                       .getByTestId('don-amt').first().should('have.text','Donated 2000birr')
                                       .getByTestId('don-date').first().should('have.text','Date: 2022-05-21')
        
      })

      it('close donations page', () => {
        cy.intercept('GET','/api/donations/',mergeResponse({ fixture: 'donations.json' })).as('dons')
        cy.getByTestId("don-view").click()
        cy.wait('@dons')
        cy.get('.xbtn').click()
        cy.getByTestId("don-view").should('be.visible')
        
      })



      
      

    

   


})