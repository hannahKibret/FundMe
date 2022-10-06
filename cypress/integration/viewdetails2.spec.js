/// <reference types="cypress"/>


describe("View detail of a fundraiser a recipient created", () => {
    beforeEach(() => {
        cy.login()
        cy.getByTestId("pro-avatar").click()
        // cy.intercept('GET','/api/fundraisers/user').as('funds')
        // cy.getByTestId("view-fund").click()
        // cy.wait('@funds')
        cy.getFund()
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

      it('delete a fundraiser', () => {
        cy.intercept('GET','**/api/fundraisers/id/*').as('fund')
        cy.get('div.container').last().contains('View Details').click()

        cy.wait('@fund')
        cy.intercept('DELETE','**/api/fundraisers/*').as('del-fund')
        cy.get('button.delete').click()
        cy.wait('@del-fund').its('response').should('deep.include',{
            body:'Fundraiser is deleted'
        })
        cy.wait('@funds')
      //   //things to be changed
        cy.get('div.container').last().getByTestId('r-title').last().should('not.have.text','Ahlam needs money')
        

      })

      it('closing fundraiser detail page', () => {
        cy.intercept('GET','**/api/fundraisers/id/*').as('fund')
        cy.get('div.container').first().contains('View Details').click()
        cy.wait('@fund')
        cy.get('.xbtn').click()
        cy.get('div.container').first().contains('View Details')
  
        
      })



    


})