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

Cypress.Commands.add('openAddItemModal', () => {
    cy.get('.Home_addButton__v3rO8').click()
})

Cypress.Commands.add('submitForm', () => {
    cy.get('.MuiDialogActions-root > .MuiButton-contained').click()
})

Cypress.Commands.add('fillForm', ({name, price, quantity}) => {
    if (name !== undefined)
        cy.get('[name="name"]').clear().type(name)
    if (price !== undefined)
        cy.get('[name="price"]').clear().type(price)
    if (quantity !== undefined)
        cy.get('[name="quantity"]').clear().type(quantity)
})