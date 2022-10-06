// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload'

Cypress.Commands.add("getByTestId", (testId) => {
    cy.get(`[data-cy = ${testId}]`,{timeout:10000})
})

Cypress.Commands.add("login", () => {
    cy.visit("/")
    cy.getByTestId("signbtn").click()
    cy.getByTestId("log-link").click()
    cy.getByTestId("log-em").type("hananmohsin967088@gmail.com")
    cy.getByTestId("log-pass").type("12345678")
    cy.intercept('POST', '/api/auth').as('login-user')
    cy.get("button").click()
    cy.wait('@login-user')
})

Cypress.Commands.add("loginAsAnAdmin", () => {
    cy.visit("/")
    cy.getByTestId("signbtn").click()
    cy.getByTestId("log-link").click()
    cy.getByTestId("log-em").type("hannakibret@gmail.com")
    cy.getByTestId("log-pass").type("12345678")
    cy.intercept('POST', '/api/auth').as('login-user')
    cy.get("button").click()
    cy.wait('@login-user')
})

Cypress.Commands.add("getFund", () => {
    cy.intercept('GET','/api/fundraisers/user').as('funds')
    cy.getByTestId("view-fund").click()
    cy.wait('@funds')
})

Cypress.Commands.add("getDet1", () => {
    cy.intercept('GET','**/api/fundraisers/id/*', req => {
        delete req.headers['if-none-match']
       }).as('fund')
      cy.get('div.container').first().contains('View Details').click()
      cy.wait('@fund')
        .its('response')
        .should('deep.include', {
          statusCode:200,
          statusMessage: 'OK'
        })
        .and('have.property', 'body') 
        .then((body) => {
         expect(body).to.be.an('object')
        })
})

Cypress.Commands.add("getDet2", () => {
    cy.intercept('GET','**/api/fundraisers/id/*',{fixture:'fundraiser.json'}).as('fund')
        cy.get('div.container').first().contains('View Details').click()
        cy.wait('@fund')
          .its('response.body')
          .should('include.all.keys', ['title','story','goalAmount','recipient','donations','category','_id','totalRaised','image'])
})

Cypress.Commands.add("getDet3", () => {
    cy.intercept('GET','**/api/fundraisers/id/*',{fixture:'fundraiser.json'}).as('fund')
    cy.get('div.container').first().contains('View Details').click()
    cy.wait('@fund')
    cy.getByTestId('f-title').should('have.text','Need money to go to college')
    cy.getByTestId('f-story').should('have.text','lorum epsum lorum epsum lorum epsum lorum epsum lorem epsum lorem epsum lorum epsum lorem epsum lorem epsum lorem epsum lorem epsum lorem epsum')
    cy.getByTestId('f-current').should('have.text','500birr')
    cy.get('.donated-container').should('have.length',2)
})

