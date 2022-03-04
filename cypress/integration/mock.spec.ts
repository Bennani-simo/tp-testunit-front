describe('Example to demonstrate API Mocking in Cypress', () => {

  beforeEach(() => {
      cy.server()
      cy.route('GET', '**/products', 'fixture:rickmorty.json')

      cy.visit('http://localhost:4200/')
  })

  it('Mock the Tags from the API Response and then validate on UI', () => {
      cy.get('.detail')
      .should('contain', 'cypress')
      .and('contain','automation')

  })

})
