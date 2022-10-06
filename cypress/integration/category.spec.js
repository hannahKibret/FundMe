/// <reference types="cypress"/>


describe("Add/Delete category", () => {
    beforeEach(() => {
      cy.loginAsAnAdmin()  
    })


    it('getting categories from the server', () => {   
         cy.intercept('GET','/api/categories',req => {
          delete req.headers['if-none-match']
         }).as('cats')
         cy.getByTestId("add-cat").click()
        cy.wait('@cats')
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

      it('getting categories from fixture and checking its length', () => {
        cy.intercept('GET','/api/categories',mergeResponse({ fixture: 'categories.json' })).as('cats')
        cy.getByTestId("add-cat").click()
        cy.wait('@cats').its('response.headers').should('include', headers) 
        cy.getByTestId('cat-lst').should('have.length', 3)
      })

      it('checking the value of the html elements that displays the name of the categories', () => {
        cy.intercept('GET','/api/categories',mergeResponse({ fixture: 'categories.json' })).as('cats')
        cy.getByTestId("add-cat").click()
        cy.wait('@cats').its('response.headers').should('include', headers) 
        cy.getByTestId('cat-lst').first().getByTestId('cat-name').first().should('have.text','Education')                            
        
      })

      it('adding category with empty field', () => {
        cy.intercept('GET','/api/categories',req => {
            delete req.headers['if-none-match']
           }).as('cats')
        cy.getByTestId("add-cat").click()
        cy.wait('@cats') 
        cy.intercept('POST','/api/categories').as('post-cat')
        cy.get("button[type='submit'").click()
        cy.wait('@post-cat').its('response').should('deep.include',{
            statusCode: 400,
            body:'"name" is not allowed to be empty'
        })
        cy.getByTestId("cat-err").should('be.visible')
        
      })

      it('adding category with correct field', () => {
        cy.intercept('GET','/api/categories',req => {
            delete req.headers['if-none-match']
           }).as('cats')
        cy.getByTestId("add-cat").click()
        cy.wait('@cats') 
        cy.intercept('POST','/api/categories').as('post-cat')
        cy.getByTestId('c-name').type('School')
        cy.get("button[type='submit'").click()
        cy.wait('@post-cat').its('response').should('deep.include',{
            statusCode: 200,
        })
        //cy.wait('@cats',{timeout:6000}) 
        //cy.getByTestId('cat-lst').last().getByTestId('cat-name').last().should('have.text','School')
        
      })

      it('deleting a category', () => {
        cy.intercept('GET','/api/categories',req => {
            delete req.headers['if-none-match']
           }).as('cats')
        cy.getByTestId("add-cat").click()
        cy.wait('@cats') 
        cy.intercept('DELETE','**/api/categories/*').as('del-cat')
        cy.getByTestId('cat-lst').last().getByTestId('delete-btn').last().click()
        cy.wait('@del-cat').its('response').should('deep.include',{
            statusCode: 200,
            body: 'Category is deleted!'
        })
        //cy.wait('@cats') 
        //cy.getByTestId('cat-lst').last().getByTestId('cat-name').last().should('not.have.text','School')
        
      })

      it('closing category page', () => {
        cy.intercept('GET','/api/categories',req => {
            delete req.headers['if-none-match']
           }).as('cats')
        cy.getByTestId("add-cat").click()
        cy.wait('@cats') 
        cy.get('.xbtn').click()
        cy.getByTestId("add-cat").should('be.visible')
        
      })
    

   


})