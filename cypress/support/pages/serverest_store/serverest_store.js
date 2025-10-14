import { ELEMENTS } from "./elements"

const el = ELEMENTS
const basicPageElements = {
            headerHomeButton: el.headerHomeButton,
            headerShoppingListButton: el.headerShoppingListButton,
            headerShoppingCartButton: el.headerShoppingCartButton, 
            headerLogoutButton: el.headerLogoutButton,
            shoppingCartButton: el.shoppingCartButton,
            searchBar: el.searchBar
}

class ServerestStore {
    isPageLoaded(){
        let allVisible = true;

        Object.values(basicPageElements).forEach((selector) => {
            cy.get(selector).then($element => {
                if (!$element.is(':visible')) {
                    allVisible = false
                }
            })
        })

        return cy.wrap(allVisible)
    }

    accessHomePage(){
        cy.visit('https://front.serverest.dev/home')
    }

    clickOnHome(){
        cy.get(el.headerHomeButton).click()
    }

    clickOnHeaderShoppingList(){
        cy.get(el.headerShoppingListButton).click()
    }

    clickOnHeaderShoppingCart(){
        cy.get(el.headerShoppingCartButton).click()
    }
    
    clickOnBodyShoppingCart(){
        cy.get(el.shoppingCartButton).click()
    }

    clickOnLogout(){
        cy.get(el.headerLogoutButton).click()
    }

    typeInSearchBar(searchTerm){
        cy.get(el.searchBar).type(searchTerm)
    }

    clearSearchBar(){
        cy.get(el.searchBar).clear()
    }

    clickOnSearchButton(){
        cy.get(el.searchButton).click()
    }

    searchForProduct(searchTerm){
        this.typeInSearchBar(searchTerm)
        this.clickOnSearchButton()
    }

    // TODO: improve usage of this method to avoid multiple calls to getProductList
    getProductList() {

        return cy.get(ELEMENTS.productListContainer).then(($container) => {
            const products = []
            
            const $productCards = $container.find(ELEMENTS.productCard)
            
            //cy.log(`Found ${$productCards.length} product cards on Serverest Store`)
            
            $productCards.each((index, productCard) => {
                const $card = Cypress.$(productCard)
                
                const product = {
                    name: $card.find(ELEMENTS.productNameAttribute).text().trim(),
                    price: $card.find(ELEMENTS.productPriceAttribute).text().trim().split(' ')[2],
                    detailsButton: $card.find(ELEMENTS.detailsButtonAttribute).filter(':contains("Detalhes")'),
                    addToList: $card.find(ELEMENTS.addToListButtonAttribute)
                }
                
                // cy.log(`Product ${index + 1}: ${product.name} - $${product.price}`)
                products.push(product)
            })
            
                return cy.wrap(products)
            })
    }
    
    getProductCount() {
        return cy.get(el.productList).find(el.productCard).its('length')
    }
    
    getProductByName(productName) {
        return this.getProductList().then((products) => {
            return products.find(product => product.name === productName)
        })
    }
    
    clickOnProductDetails(productName) {
        this.getProductByName(productName).then((product) => {
            if (product && product.detailsButton) {
                cy.wrap(product.detailsButton).click()
            } else {
                throw new Error(`Product with name "${productName}" not found or has no details button.`)
            }
        })
    }
    
    addProductToList(productName) {
        this.getProductByName(productName).then((product) => {
            if (product && product.addToList) {
                cy.wrap(product.addToList).click()
            }
        })
    }
}

export default new ServerestStore()