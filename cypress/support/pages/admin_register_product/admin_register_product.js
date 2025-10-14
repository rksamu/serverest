import { ELEMENTS } from "./elements"

const el = ELEMENTS

class AdminRegisterProduct {
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
        cy.visit('https://front.serverest.dev/admin/cadastrarprodutos')
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

    fillPrice(price){
        cy.get(el.price).clear().type(price)
    }

    fillDescription(description){
        cy.get(el.description).clear().type(description)
    }

    fillQuantity(quantity){
        cy.get(el.quantity).clear().type(quantity)
    }

    fillForms(name, price, description, quantity){
        if(name) {
            this.fillName(name)
        }
        if(price) {
            this.fillPrice(price)
        }
        if(description) {
            this.fillDescription(description)
        }
        if(quantity) {
            this.fillQuantity(quantity)
        }
    }

    submitForm(){
        cy.get(el.createProductButton).click()
    }

}

export default new AdminRegisterProduct()