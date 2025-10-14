import { ELEMENTS } from "./elements"

const el = ELEMENTS

class AdminRegisterUser {
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

    accessPage(){
        cy.visit('https://front.serverest.dev/admin/cadastrarusuarios')
    }

    clickOnHome(){
        cy.get(el.headerHomeButton).click()
    }

    clickOnHeaderRegisterUsers(){
        cy.get(el.headerRegisterUsers).click()
    }

    clickOnHeaderListUsers(){
        cy.get(el.headerListUsers).click()
    }
    
    clickOnHeaderRegisterProducts(){
        cy.get(el.headerRegisterProducts).click()
    }

    clickOnHeaderListProducts(){
        cy.get(el.headerListProducts).click()
    }

    clickOnLogout(){
        cy.get(el.headerLogoutButton).click()
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

export default new AdminRegisterUser()