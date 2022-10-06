/// <reference types="cypress"/>


describe("View fundraisers the a recipient created", () => {
    beforeEach(() => {
        
    })


    it('getting fundraisers from the server and checking if it is an array', () => {
        cy.intercept('GET','/api/fundraisers/popular', req => {
         delete req.headers['if-none-match']
        }).as('funds')
        cy.login()
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

      const headers = {
        'access-control-allow-origin': Cypress.config('baseUrl'),
        'Access-Control-Allow-Credentials': 'true'
      }
  
      const mergeResponse = (options = {}) => {
        return Object.assign({}, { headers }, options)
      }

      it('getting fundraisers from fixture and checking if it has a length of 4', () => {
        cy.intercept('GET','/api/fundraisers/popular',mergeResponse({ fixture: 'fundraisers.json' })).as('funds')
        cy.login()
        cy.wait('@funds').its('response.headers').should('include', headers) 
        cy.get('div.container').should('have.length', 4)
        
      })

      it('checking the value of the html elements that displays the title,image,story,goal of the first fundraiser', () => {
        cy.intercept('GET','/api/fundraisers/popular',mergeResponse({ fixture: 'fundraisers.json' })).as('funds')
        cy.login()
        cy.wait('@funds').its('response.headers').should('include', headers) 
        cy.get('div.container').first().getByTestId('f-img').first().should('be.visible')
                                       .getByTestId('f-title').first().should('have.text','Need money to go to college')
                                       .getByTestId('f-story').first().should('have.text','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ornare consequat velit, non aliquet quam dapibus sed. Cras nec mi nec nisl efficitur c...')
                                       .getByTestId('f-goal').first().should('have.text','0birr raised of 20000birr')
        cy.contains('View Details')
        
      })
    

   


})