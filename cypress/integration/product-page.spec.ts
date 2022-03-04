describe("header selector", () => {
  beforeEach(() => {
    cy.intercept('/rickmorty', { fixture: 'rickmorty.json' });
    cy.visit("http://localhost:4200");
  });

  it("Application header contain text", () => {
    cy.get(".app")
      .find("span")
      .should("contain.text", "Application de ouuuf");
  });


  it("Available product contains 24 item", () => {
    cy.get(".flex-item")
      .find("li")
      .should("have.length", 24);
 });

 it('redirect to panier', () => {
    cy.get(".app")
  //cy.get('input[name=description]').type('Hello World')
    .find("button:first")
    .click()

    cy.location('pathname').should('eq', '/cart')
});

it("Application header contain text", () => {
  cy.get(".app")
    .find("button:first")
    .click()
    cy.get(".test2")
    .find("h1")
    .should("contain.text", "Mon Panier");
});








});


