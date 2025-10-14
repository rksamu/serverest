import { ELEMENTS } from "./elements"

const el = ELEMENTS

class CreateAccountPage {
    isPageLoaded(){
        let allVisible = true;

        Object.values(el).forEach((selector) => {
            cy.get(selector).then($element => {
                if (!$element.is(':visible')) {
                    allVisible = false
                }
            })
        })

        return cy.wrap(allVisible)
    }

    accessCreateAccountPage(){
        if(cy.url() !== 'https://front.serverest.dev/login') {
            cy.visit('https://front.serverest.dev/login')
        }
        cy.get(el.createAccountButton).click()
    }

    fillName(name){
        cy.get(el.name).clear().type(name)
    }

    fillEmail(email){
        cy.get(el.email).clear().type(email)
    }

    fillPassword(password){
        cy.get(el.password).clear().type(password)
    }

    fillForms(name, email, password){
        if(name) {
            this.fillName(name)
        }
        if(email) {
            this.fillEmail(email)
        }
        if(password) {
            this.fillPassword(password)
        }
    }

    checkCreateAsAdmin(){
        cy.get(el.signAsAdminCheckbox).check()
    }

    submitForm(){
        cy.get(el.createAccountButton).click()
    }
}

export default new CreateAccountPage()