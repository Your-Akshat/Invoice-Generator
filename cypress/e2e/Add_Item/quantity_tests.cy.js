describe('Positive Cases', () => {
    it('natural number', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price: "100", quantity: "10"})
        cy.submitForm()

        cy.get('.MuiDialogActions-root').should('not.exist')    
        cy.contains('myItem').should('exist')
        cy.contains('100').should('exist')
        cy.contains('10').should('exist')
    })
})

describe('Negative Cases', () => {
    it('empty value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price: "100"})
        cy.submitForm()

        cy.get('#«r6»-helper-text').contains('Quantity is required').should('exist')
    })

    it('not a number', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price: "100", quantity: "abc"})
        cy.submitForm()

        cy.get('#«r6»-helper-text').contains('Quantity must be a number').should('exist')
    })

    it('alphanumeric value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price: "100", quantity: "abc10"})
        cy.submitForm()

        cy.get('#«r6»-helper-text').contains('Quantity must be a number').should('exist')
    })

    it('decimal value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"100", quantity:"10.75"})
        cy.submitForm()

        cy.get('#«r6»-helper-text').contains("Quantity can't be a decimal value").should('exist')
    })

    it('negative value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"100", quantity:"-10"})
        cy.submitForm()

        cy.get('#«r6»-helper-text').contains('Quantity must be greater than 0').should('exist')
    })

    it('zero value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"100", quantity:"0"})
        cy.submitForm()

        cy.get('#«r6»-helper-text').contains('Quantity must be greater than 0').should('exist')
    })

    it('very large value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"100", quantity:"20000"})
        cy.submitForm()

        cy.get('#«r6»-helper-text').contains("Quantity can't be more than 9999").should('exist')
    })

    it('scientific notation', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"100", quantity:"1e2"})
        cy.submitForm()

        cy.get('#«r6»-helper-text').contains('Scientific notation not allowed').should('exist')
    })
})

describe('Edge Cases', () => {
    it('lower bound value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"100", quantity:"1"})
        cy.submitForm()

        cy.get('.MuiDialogActions-root').should('not.exist')    
        cy.contains('myItem').should('exist')
        cy.contains('100').should('exist')
        cy.contains('1').should('exist')
    })

    it('upper bound value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"100", quantity:"9999"})
        cy.submitForm()

        cy.get('.MuiDialogActions-root').should('not.exist')    
        cy.contains('myItem').should('exist')
        cy.contains('100').should('exist')
        cy.contains('9999').should('exist')
    })
})