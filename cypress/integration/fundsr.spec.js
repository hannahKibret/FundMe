/// <reference types="cypress"/>


describe("View fundraisers the a recipient created", () => {
    beforeEach(() => {
      cy.login()  
      cy.getByTestId("pro-avatar").click()
    })


    it('getting fundraisers from the server', () => {   
         cy.log('intercepting /fundraisers/user')
         cy.intercept('GET','/api/fundraisers/user',req => {
          delete req.headers['if-none-match']
         }).as('funds')
        cy.getByTestId("view-fund").click()
        cy.wait('@funds')
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

      it('getting fundraisers from the server with invalid token', () => {   
        cy.log('intercepting /fundraisers/user')
        cy.intercept('GET','/api/fundraisers/user',req => {
         delete req.headers['if-none-match']
         req.headers['x-auth-token'] = 'fjkdjfkjkfkjdf'
        }).as('funds')
       cy.getByTestId("view-fund").click()
       cy.wait('@funds')
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

      it('getting fundraisers from fixture and checking its length', () => {
        cy.intercept('GET','/api/fundraisers/user',mergeResponse({ fixture: 'fundraisers.json' })).as('funds')
        cy.getByTestId("view-fund").click()
        cy.wait('@funds').its('response.headers').should('include', headers) 
        cy.get('div.container').should('have.length', 4)
      })

      it('checking the value of the html elements that displays the title,image,story,goal of the first fundraiser', () => {
        cy.intercept('GET','/api/fundraisers/user',mergeResponse({ fixture: 'fundraisers.json' })).as('funds')
        cy.getByTestId("view-fund").click()
        cy.wait('@funds').its('response.headers').should('include', headers) 
        cy.get('div.container').first().getByTestId('r-img').first().should('be.visible')
                                       .getByTestId('r-title').first().should('have.text','Need money to go to college')
                                       .getByTestId('r-story').first().should('have.text','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare consequat velit, non aliquet quam dapibus sed. Cras nec mi nec nisl efficitur c...')
                                       .getByTestId('r-goal').first().should('have.text','0birr raised of 20000birr')
        cy.contains('View Details')
        
      })

      it('closing fundraiser list page of the recipient', () => {
        cy.intercept('GET','/api/fundraisers/user').as('funds')
        cy.getByTestId("view-fund").click()
        cy.wait('@funds')
        cy.get('.xbtn').click()
        cy.getByTestId("view-fund").should('be.visible')
        
      })
    

   


})