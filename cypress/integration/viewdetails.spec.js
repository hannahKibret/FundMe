/// <reference types="cypress"/>


describe("View detail of a fundraiser a recipient created", () => {
    beforeEach(() => {
      cy.intercept('GET','/api/fundraisers/popular').as('funds')
      cy.login()
      cy.log('gonna intercept')
      cy.wait('@funds')
      
    })


    it('getting details of a fundraiser from the server', () => {
        cy.getDet1()
      })

      it('stubbing a request for fundraiser detail', () => {
       
        cy.getDet2()
                                            

      })

      it('the elements should have a value corresponding to that sent as a response', () => {
        cy.getDet3()

      })

      it('closing fundraiser detail page', () => {
        cy.intercept('GET','**/api/fundraisers/id/*').as('fund')
        cy.get('div.container').first().contains('View Details').click()
        cy.wait('@fund')
        cy.wait('@funds')
        cy.get('.xbtn').click()
        cy.get('div.container').first().contains('View Details')
  
        
      })

   

    


})