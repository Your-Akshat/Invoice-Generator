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

    it('decimal value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price: "100.75", quantity: "10"})
        cy.submitForm()

        cy.get('.MuiDialogActions-root').should('not.exist')    
        cy.contains('myItem').should('exist')
        cy.contains('100.75').should('exist')
        cy.contains('10').should('exist')
    })
})

describe('Negative Cases', () => {
    it('empty value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", quantity: "10"})
        cy.submitForm()

        cy.get('#«r5»-helper-text').contains('Price is required').should('exist')
    })

    it('not a number', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price: "abcd", quantity: "10"})
        cy.submitForm()

        cy.get('#«r5»-helper-text').contains('Price must be a number').should('exist')
    })

    it('alphanumeric value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price: "abcd123", quantity: "10"})
        cy.submitForm()

        cy.get('#«r5»-helper-text').contains('Price must be a number').should('exist')
    })

    it('negative value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"-50", quantity:"10"})
        cy.submitForm()

        cy.get('#«r5»-helper-text').contains('Price must be greater than 0').should('exist')
    })

    it('zero value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"0", quantity:"10"})
        cy.submitForm()

        cy.get('#«r5»-helper-text').contains('Price must be greater than 0').should('exist')
    })

    it('very large value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"30000", quantity:"10"})
        cy.submitForm()

        cy.get('#«r5»-helper-text').contains("Price can't be greater than 24,999").should('exist')
    })

    it('scientific notation', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"1e3", quantity:"10"})
        cy.submitForm()

        cy.get('#«r5»-helper-text').contains('Scientific notation not allowed').should('exist')
    })
})

describe('Edge Cases', () => {
    it('lower bound value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"1", quantity:"10"})
        cy.submitForm()

        cy.get('.MuiDialogActions-root').should('not.exist')    
        cy.contains('myItem').should('exist')
        cy.contains('1').should('exist')
        cy.contains('10').should('exist')
    })

    it('upper bound value', () => {
        cy.visit('/')
        cy.openAddItemModal()
        cy.fillForm({name: "myItem", price:"24999", quantity:"10"})
        cy.submitForm()

        cy.get('.MuiDialogActions-root').should('not.exist')    
        cy.contains('myItem').should('exist')
        cy.contains('24999').should('exist')
        cy.contains('10').should('exist')
    })
})