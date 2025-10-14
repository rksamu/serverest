import { ELEMENTS } from "./elements"

const el = ELEMENTS

class AdminHome {
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
        cy.visit('https://front.serverest.dev/admin/home')
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

    clickOnBodyRegisterUsers(){
        cy.get(el.bodyRegisterUsers).click()
    }

    clickOnBodyListUsers(){
        cy.get(el.bodyListUsers).click()
    }

    clickOnBodyRegisterProducts(){
        cy.get(el.bodyRegisterProducts).click()
    }

    clickOnBodyListProducts(){
        cy.get(el.bodyListProducts).click()
    }

    clickOnBodyReports(){
        cy.get(el.bodyReports).click()
    }

}

export default new AdminHome()