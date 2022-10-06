/// <reference types="cypress"/>


describe("Editing a fundraiser", () => {

    const image = "img1.png"
    beforeEach(() => {
        cy.login()
        cy.getByTestId("pro-avatar").click()

        // cy.intercept('GET','/api/fundraisers/user').as('funds')
        // cy.getByTestId("view-fund").click()
        // cy.wait('@funds')
        cy.getFund()
        cy.intercept('GET','**/api/fundraisers/id/*', req => {
          delete req.headers['if-none-match']
         }).as('fund')
        cy.get('div.container').last().contains('View Details').click()
        cy.wait('@fund')
        cy.intercept('PUT','**/api/fundraisers/*').as('edit-fund')
        cy.get('button.edit').click()
    })

   

    it('editing a fundraiser without a title', () => {
        
        cy.getByTestId("fund-title").clear({ force: true })
        cy.get("button[type='submit']").click()
        cy.wait('@edit-fund').its('response').should('deep.include', {
            statusCode: 400,
            body: '"title" is not allowed to be empty'
          })
        cy.getByTestId("title-err").should('be.visible')


      })

      it('editing a fundraiser without a story', () => {
        cy.getByTestId("fund-story").clear({ force: true })
        cy.get("button[type='submit']").click()
        cy.wait('@edit-fund').its('response').should('deep.include', {
            statusCode: 400,
            body: '"story" is not allowed to be empty'
          })
        cy.getByTestId("story-err").should('be.visible')
      })

      it('editing a fundraiser without a goal', () => {
        cy.getByTestId("fund-goal").clear({ force: true })
        cy.get("button[type='submit']").click()
        cy.wait('@edit-fund').its('response').should('deep.include', {
            statusCode: 400,
            body: '"goalAmount" must be a number'
          })
        cy.getByTestId("goal-err").should('be.visible')
      })

      it('editing a fundraiser with uploading new image', () => {
        cy.getByTestId("fund-title").clear({ force: true })
        cy.getByTestId("fund-title").type('needs money')
        cy.get('input[type="file"]').attachFile(image)
        cy.get('select').select(1,{force:true})
        cy.get("button[type='submit']").click()
        cy.wait('@edit-fund').its('response.body').should('include',
        {
          title: 'needs money'
          })
        cy.wait('@fund')
        cy.getByTestId('f-title').should('have.text','needs money')
      })

       it('editing a fundraiser without uploading new image', () => {
        cy.getByTestId("fund-title").clear({ force: true })
        cy.getByTestId("fund-title").type('Ahlam needs money')
        cy.get('select').select(0,{force:true})
        cy.get("button[type='submit']").click()
        cy.wait('@edit-fund').its('response.body').should('include',
        {
          title: 'Ahlam needs money'
          })
        cy.wait('@fund')
        cy.getByTestId('f-title').should('have.text','Ahlam needs money')
      })

      it('closing edit fundraiser page', () => {
        cy.get('.xbtn').click()
        cy.get('button.edit').should('be.visible')
        
      })

})