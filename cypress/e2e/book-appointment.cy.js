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

    const users = Cypress.env('users')
    users.forEach((user)=>{
        context(`Form Login with multiple data ${user.id}`,()=>{
            it(`Form Login: Fullfill Form Login With  ${user.validity} Data`,()=>{
                cy.ClickBtnMakeAppointment()
                cy.get('#txt-username').type(user.username)
                cy.get('#txt-password').type(user.password)
                cy.get('#btn-login').click()

                const isValid = user.validity === "Valid"
                if(isValid){
                    cy.url().should('include','/#appointment')
                } else{
                    cy.get('.text-danger').should('be.visible')
                }
            })
        })
    })
})