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


Cypress.Commands.add('ClickBtnMakeAppointment',()=>{
    cy.get('#btn-make-appointment').click()
    cy.url().should('include','/profile.php#login')
})

Cypress.Commands.add('login',()=>{
    cy.get('#txt-username').type('John Doe')
    cy.get('#txt-password').type('ThisIsNotAPassword')
    cy.get('#btn-login').click()
})

Cypress.Commands.add('fillFormAppointment',(data)=>{
    cy.get('#combo_facility').select(`${data.facility}`)
                
    if (data.readmission){
        cy.get('#chk_hospotal_readmission').click()
    } else {
        cy.log('Checkbox Readmission Not Checked')
    }
                
    if (`${data.healthcare_program}` == 'Medicare' ){
        cy.get('#radio_program_medicare').click()
    } else if(`${data.healthcare_program}` == 'Medicaid') {
        cy.get('#radio_program_medicaid').click()
    } else if(`${data.healthcare_program}` == 'None') {
        cy.get('#radio_program_none').click()
    }

    if(data.date != ""){
        cy.get('#txt_visit_date').type(`${data.date}`)
        cy.get('#txt_visit_date').type('{esc}');
    }
                
    cy.get('#txt_comment').type(`${data.comment}`)
})