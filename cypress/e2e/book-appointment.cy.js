describe('Book-Appointment',()=>{
    beforeEach(()=>{
        cy.visit('/')
    })

    context('Go To Book Appointment Page',()=>{
        it('Home Page: Click Button Book Appoinment',()=>{
            cy.get('#btn-make-appointment').click()
            cy.url().should('include','/profile.php#login')
        })
    })

    context('Form Login ( Positive ) ',()=>{
        it('Form Login: Fullfill Form Login With Valid Data',()=>{
            cy.ClickBtnMakeAppoinment()
            cy.get('#txt-username').type('John Doe')
            cy.get('#txt-password').type('ThisIsNotAPassword')
            cy.get('#btn-login').click()
        })
    })
})