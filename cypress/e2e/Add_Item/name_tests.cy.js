describe('Positive Cases', () => {
  it('alphabet name', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "myItem", price: "100", quantity: "10"})
    cy.submitForm()

    cy.get('.MuiDialogActions-root').should('not.exist')    
    cy.contains('myItem').should('exist')
    cy.contains('100').should('exist')
    cy.contains('10').should('exist')
  })

  it('alphanumeric name', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "myItem1", price: "100", quantity: "10"})
    cy.submitForm()

    cy.get('.MuiDialogActions-root').should('not.exist')    
    cy.contains('myItem1').should('exist')
    cy.contains('100').should('exist')
    cy.contains('10').should('exist')
  })
  
  it('name with hyphens', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "sample-1", price: "100", quantity: "10"})
    cy.submitForm()

    cy.get('.MuiDialogActions-root').should('not.exist')    
    cy.contains('sample-1').should('exist')
    cy.contains('100').should('exist')
    cy.contains('10').should('exist')
  })

  it('name with underscores', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "sample_123", price: "100", quantity: "10"})
    cy.submitForm()

    cy.get('.MuiDialogActions-root').should('not.exist')    
    cy.contains('sample_123').should('exist')
    cy.contains('100').should('exist')
    cy.contains('10').should('exist')
  })

  it('name with spaces', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "sample item", price: "100", quantity: "10"})
    cy.submitForm()

    cy.get('.MuiDialogActions-root').should('not.exist')    
    cy.contains('sample item').should('exist')
    cy.contains('100').should('exist')
    cy.contains('10').should('exist')
  })
})

describe('Negative Cases', () => {  
  it('name not entered', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({price: "100", quantity: "10"})
    cy.submitForm()
    
    cy.get('#«r4»-helper-text').contains('Name is required').should('exist')
  })

  it('blank name entered (spaces only)', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: " ", price: "100", quantity: "10"})
    cy.submitForm()
    
    cy.get('#«r4»-helper-text').contains('Name is required').should('exist')
  })

  it('number entered as name', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "12345", price: "100", quantity: "10"})
    cy.submitForm()
    
    cy.get('#«r4»-helper-text').contains("Number can't be name").should('exist')
  })
})

describe('Edge Cases', () => {
  it('small length name', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "ab", price: "100", quantity: "10"})
    cy.submitForm()

    cy.get('#«r4»-helper-text').contains('Invalid name length').should('exist')
  })

  it('large length name', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "asdfghjklqwertyuiopzxcvbnm1234567890", price: "100", quantity: "10"})
    cy.submitForm()

    cy.get('#«r4»-helper-text').contains('Invalid name length').should('exist')
  })

  it('special character in name', () => {
    cy.visit('/')
    cy.openAddItemModal()
    cy.fillForm({name: "item=123", price: "100", quantity: "10"})
    cy.submitForm()

    cy.get('#«r4»-helper-text').contains('Name can only contain letters, numbers, hyphens (-), underscores (_) and spaces').should('exist')
  })
})