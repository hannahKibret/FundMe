/// <reference types="cypress"/>


describe("Post fundraiser", () => {
    //?all invalid fields
    const title = "Need money to go to college"
    const image = "img1.png"
    const story = "lorum epsum lorum epsum lorum epsum lorum epsum lorem epsum lorem epsum lorum epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum"
    const goal = "20000"
  
    beforeEach(() => {
        cy.login()
        cy.getByTestId("pro-avatar").click()
       
        cy.getByTestId("post-fund").click()
        cy.intercept('POST', '/api/image').as('post-img')
        cy.intercept('POST', '/api/fundraisers').as('post-fund')
        
    })

    it("post a fundraiser with all empty field", () => {
        cy.get('button[type="submit"]').click();
        
        cy.wait('@post-fund').its('response').should('deep.include', {
            statusCode: 400,
            body: '"title" is not allowed to be empty'
          })
        cy.getByTestId("title-err").should('be.visible')
        cy.getByTestId("image-err").should('be.visible')
        cy.getByTestId("goal-err").should('be.visible')
        cy.getByTestId("story-err").should('be.visible')
    })

    it("post a fundraiser without a title", () => {
        cy.get('input[type="file"]').attachFile(image)
        cy.get('img').should('be.visible')
        cy.getByTestId('fund-goal').type(goal)
        cy.getByTestId('fund-story').type(story)
        cy.get('select').select(1)
        cy.get('button[type="submit"]').click();
        cy.wait('@post-img')
        cy.wait('@post-fund').its('response').should('deep.include', {
            statusCode: 400,
            body: '"title" is not allowed to be empty'
          })
        cy.getByTestId("title-err").should('be.visible')
      

    })

    it("post a fundraiser without an image", () => {
        cy.getByTestId('fund-title').type(title)
        cy.getByTestId('fund-goal').type(goal)
        cy.getByTestId('fund-story').type(story)
        cy.get('select').select(1)
        cy.get('button[type="submit"]').click();
        cy.getByTestId("image-err").should('be.visible')
      

    })

    it("post a fundraiser without a goal", () => {
        cy.getByTestId('fund-title').type(title)
        cy.get('input[type="file"]').attachFile(image)
        cy.getByTestId('fund-story').type(story)
        cy.get('select').select(1)
        cy.get('button[type="submit"]').click();
        cy.wait('@post-img')
        cy.wait('@post-fund').its('response').should('deep.include', {
            statusCode: 400,
            body: '"goalAmount" must be a number'
          })
        cy.getByTestId("goal-err").should('be.visible')
      

    })

    it("post a fundraiser without a story", () => {
        cy.getByTestId('fund-title').type(title)
        cy.get('input[type="file"]').attachFile(image)
        cy.getByTestId('fund-goal').type(goal)
        cy.get('select').select(1)
        cy.get('button[type="submit"]').click();
        cy.wait('@post-img')
        cy.wait('@post-fund').its('response').should('deep.include', {
            statusCode: 400,
            body: '"story" is not allowed to be empty'
          })
        cy.getByTestId("story-err").should('be.visible')
      

    })

    it("post fundraiser with valid information", () => {
        cy.getByTestId('fund-title').type(title)
        cy.get('input[type="file"]').attachFile(image)
        cy.getByTestId('fund-goal').type(goal)
        cy.getByTestId('fund-story').type(story)
        cy.get('select').select(2)
        cy.get('button[type="submit"]').click();
        cy.wait('@post-img')
        cy.wait('@post-fund').its('response').should('deep.include', {
            statusCode: 201,
          }).and('have.property','body')
          .then((body) => {
            expect(body).to.have.property('_id')
             
          })       
        
      

    })

    it('closing fundraiser post page', () => {
        cy.get('.xbtn').click()
        cy.getByTestId("post-fund").should('be.visible')
        cy.get('.xbtn').click()
        
      })



})