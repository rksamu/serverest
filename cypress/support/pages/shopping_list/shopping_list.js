import { ELEMENTS } from "./elements"

const el = ELEMENTS
const basicPageElements = {
            headerHomeButton: el.headerHomeButton,
            headerShoppingListButton: el.headerShoppingListButton,
            headerShoppingCartButton: el.headerShoppingCartButton, 
            headerLogoutButton: el.headerLogoutButton,
            homeButton: el.homeButton,
            addToCartButton: el.addToCartButton,
            clearListButton: el.clearListButton
}

class ShoppingList {
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

    accessShoppingListPage(){
        cy.visit('https://front.serverest.dev/minhaListaDeProdutos')
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
    
    clickOnBodyHomeButton(){
        cy.get(el.homeButton).click()
    }

    clickOnClearList(){
        cy.get(el.clearListButton).click()
    }

    getProductList(){
        return cy.get(el.productListContainer).then(($container) => {
            const products = []
            
            const $productCards = $container.find(ELEMENTS.productCard)
            
            //cy.log(`Found ${$productCards.length} product cards on Lista de Compras`)
            
            $productCards.each((index, productCard) => {
                const $card = Cypress.$(productCard)
                
                const product = {
                    name: $card.find(ELEMENTS.productNameAttribute).text().trim().split(':')[1],
                    price: ($card.text().match(/R\$[0-9]+/) || [])[0]?.replace('R$', '') || null,
                    increaseButton: $card.find(ELEMENTS.increaseQuantityButton),
                    decreaseButton: $card.find(ELEMENTS.decreaseQuantityButton),
                    total: $card.find(el.totalItensAttribute).text().match(/Total:\s*([0-9]+)/)?.[1] || 0
                }
            
                
                //cy.log(`Product ${index + 1}: ${product.name} - $${product.price} Total: ${product.total}`)
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
        getProductByName(productName).then((product) => {
            if (product && product.detailsButton) {
                cy.wrap(product.detailsButton).click()
            }
        })
    }
    
    addProductToList(productName) {
        getProductByName(productName).then((product) => {
            if (product && product.addToList) {
                cy.wrap(product.addToList).click()
            }
        })
    }

    isEmpty() {
        return cy.contains('Seu carrinho está vazio').should('exist').then(() => {
            return cy.wrap(true)
    })
}
    
}

export default new ShoppingList()