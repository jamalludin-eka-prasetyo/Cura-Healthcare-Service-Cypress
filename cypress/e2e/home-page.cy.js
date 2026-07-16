describe('template spec', () => {
  beforeEach(()=>{
    cy.visit('/')
  })

  context("Home Page Sections",()=>{
    it("Home Page : Should have a header CURA Healthcare Service",()=>{
      cy.get('h1').contains("CURA Healthcare Service")
    })

    it("Home Page: Should have a toggle menu",()=>{
      cy.get('#menu-toggle').should('have.class','toggle')
    })
  })

  context("Footer Section",()=>{
    it("Footer: Should have information location",()=>{
      cy.get('p').contains('Atlanta 550 Pharr Road NE Suite 525')
      cy.get('p').contains('Atlanta, GA 30305')
    })

    it("Footer: Should have information phone and email",()=>{
      cy.get('.list-unstyled').contains('(678) 813-1KMS')
      cy.get('.list-unstyled').contains('info@katalon.com').should('have.attr','href')
    })
  })
}) 