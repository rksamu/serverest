import { ELEMENTS } from "./elements"

const el = ELEMENTS

class LoginPage {
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

    accessLoginPage(){
        if(cy.url() !== 'https://front.serverest.dev/login') {
            cy.visit('https://front.serverest.dev/login')
        }
    }
    fillEmail(email){
        cy.get(el.email).clear().type(email)
    }
    fillPassword(password){
        cy.get(el.password).clear().type(password)
    }
    fillForms(email, password){
        if(email) {
            this.fillEmail(email)
        }
        if(password) {
            this.fillPassword(password)
        }
    }
    submitForm(){
        cy.get(el.signIn).click()
    }
}

export default new LoginPage()