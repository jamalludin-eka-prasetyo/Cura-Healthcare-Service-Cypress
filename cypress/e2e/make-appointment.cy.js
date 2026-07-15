describe("Make Appointment",()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.ClickBtnMakeAppoinment()
        cy.login()
    })

    context("Make Appointment",()=>{
        it("Make Appointment: Header Make Appointment Should be Visible",()=>{
            cy.get('h2').contains('Make Appointment')
        })

        it('Make Appoinment: Should Have a Form',()=>{
            cy.get('form').should('be.visible')
        })

        it('Make Appointment: Submit Form With Blank Form',()=>{
            cy.get('#btn-book-appointment').click()
            cy.get('#txt_visit_date').then(($input)=>{
                const input1 = $input[0]
                expect(input1.validity.valid).to.be.false
                expect(input1.validationMessage).to.not.be.empty
            })
        })

        it('Make Appointment: Submit Form With Valid Data',()=>{
            cy.get('#combo_facility').select('Hongkong CURA Healthcare Center')
            cy.get('#chk_hospotal_readmission').click()
            cy.get('#radio_program_medicare').click()
            cy.get('#txt_visit_date').type('20/07/2026')
            cy.get('#txt_visit_date').type('{esc}');
            cy.get('#txt_comment').type('ngopi')
            cy.get('#btn-book-appointment').click()
        })

        it.only('Make Appointment: Validate Appointment Confirmation',()=>{
            cy.validData()
            cy.get('#facility').should('contain','Hongkong CURA Healthcare Center')
            cy.get('#hospital_readmission').should('contain','Yes')
            cy.get('#program').should('contain','Medicare')
            cy.get('#visit_date').should('contain','20/07/2026')
            cy.get('#comment').should('contain','ngopi')
        })
    })
})