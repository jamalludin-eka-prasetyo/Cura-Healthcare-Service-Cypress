describe("Make Appointment",()=>{
    beforeEach(()=>{
        cy.visit('/')
        cy.ClickBtnMakeAppointment()
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

        const dataUsers = Cypress.env('dataUsers')
        dataUsers.forEach((data)=>{
            it.only(`Make Appointment: Submit Form With Data ${data.id}`,()=>{
                cy.fillFormAppointment(data)
                cy.get('#btn-book-appointment').click()
                
                if(data.date == ""){
                    cy.get('#txt_visit_date').then(($input)=>{
                        const input1 = $input[0]
                        expect(input1.validity.valid).to.be.false
                        expect(input1.validationMessage).to.not.be.empty
                    })    
                    cy.url().should('not.include','/appointment.php#summary')
                } else { 
                    cy.url().should('include','/appointment.php#summary')

                    cy.get('#facility').should('contain',`${data.facility}`)
                    cy.get('#hospital_readmission').should('contain',data.readmission ? 'Yes' : 'No')
                    cy.get('#program').should('contain',`${data.healthcare_program}`)
                    cy.get('#visit_date').should('contain',`${data.date}`)
                    cy.get('#comment').should('contain',`${data.comment}`)
                }
            })
        })


        it('Make Appointment: Validate Appointment Confirmation',()=>{
            cy.fillFormAppointment(data)
            cy.get('#facility').should('contain','Hongkong CURA Healthcare Center')
            cy.get('#hospital_readmission').should('contain','Yes')
            cy.get('#program').should('contain','Medicare')
            cy.get('#visit_date').should('contain','20/07/2026')
            cy.get('#comment').should('contain','ngopi')
        })
    })
})