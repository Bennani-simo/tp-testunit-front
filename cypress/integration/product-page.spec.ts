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
      .should("have.length", 25);
 });


 it("ajout au panier", () => {
  cy.get(".detail").first()
  .find("button")
  .click()
});



 it('redirect to panier', () => {
    cy.get(".button1")
    .find("button")
    .click()
    cy.location('pathname').should('eq', '/cart')
});


it("La page panier est affiché", () => {
  cy.get(".app")
    .find("button:first")
    .click()
    cy.get(".test2")
    .find("h1")
    .should("contain.text", "Mon Panier");
});


it("IL Y'a un article dans le panier", () => {
  cy.get(".app")
    .find("button:first")
    .click()
    cy.get(".test2")
    .find("li")
    .should("have.length", 1);
});


it('redirect to STORE', () => {
  cy.get(".button2")
//cy.get('input[name=description]').type('Hello World')
  .find("button")
  .click()

  cy.location('pathname').should('eq', '/product-list')
});

});


