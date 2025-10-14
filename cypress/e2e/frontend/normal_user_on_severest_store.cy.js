import LoginPage from "../../support/pages/login/login"
import ServerestStore from "../../support/pages/serverest_store/serverest_store"
import ShoppingList from "../../support/pages/shopping_list/shopping_list"

const defaultUserEmail = 'testuser10101@testmail.com'
const password = 'test123'

describe('Use a Normal Account on the ServeRest Store', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://serverest.dev/produtos').as('getProducts')
    
    cy.visit('https://front.serverest.dev/login')
    
    LoginPage.fillForms(defaultUserEmail, password)
    LoginPage.submitForm()

    ServerestStore.isPageLoaded().should('be.true')
    cy.wait("@getProducts") // Ensure all products are loaded
    cy.wait(2000)
  })

  it ('Should search for products and receive according results', () => {
    let productList = []
    ServerestStore.getProductList().then((products) => {
        productList = products
        expect(productList.length).to.be.greaterThan(0)

        ServerestStore.searchForProduct('prod')
        ServerestStore.getProductList().then((products) => {
            // Product list should be smaller than the original one
            expect(products.length).to.be.lessThan(productList.length)
            products.forEach((product) => {
                // All products should have 'prod' in their name
                expect(product.name.toLowerCase()).to.include('prod')
            })
        })

        ServerestStore.clearSearchBar()
        ServerestStore.clickOnSearchButton()
        cy.wait(5000)
        ServerestStore.getProductList().then((products) => {
            // Product list should be equal to the original one
            expect(products.length).to.equal(productList.length)
        })
    })
  })

  it('Should corretly display product details', () => {
    let productList = []
    ServerestStore.getProductList().then((products) => {
        productList = products
        expect(productList.length).to.be.greaterThan(0)
        console.log(productList.length)
    
        
        let amountOfListedProducts = productList.length
        let firstProductName = productList[0].name
        let firstProductPrice = productList[0].price

        ServerestStore.clickOnProductDetails(firstProductName)
        cy.contains(firstProductName).should('be.visible')
        cy.contains(firstProductPrice).should('be.visible')
        ServerestStore.clickOnHome()
        cy.wait(2000)

        ServerestStore.searchForProduct('sa')
        cy.wait('@getProducts')
        cy.wait(2000)

        ServerestStore.getProductList().then((products) => {
            let filteredProducts = products
            let len = filteredProducts.length
            expect(len).to.be.lessThan(amountOfListedProducts)

            let lastProductName = filteredProducts[len - 1].name
            let lastProductPrice = filteredProducts[len - 1].price

            ServerestStore.clickOnProductDetails(lastProductName)
            cy.contains(lastProductName).should('be.visible')
            cy.contains(lastProductPrice).should('be.visible')
            ServerestStore.clickOnHome()
            cy.wait(2000)
        })
    })
  })

  it('Should open the empty shopping list by clicking on the shopping cart button', () => {
    ServerestStore.clickOnBodyShoppingCart()
    cy.contains('Seu carrinho está vazio').should('be.visible')
    ServerestStore.clickOnHome()
    cy.wait(2000)
  })

  it('Should add products to the shopping list and verify they are added', () => {
    let productList = []
    ServerestStore.getProductList().then((products) => {
        productList = products
        expect(productList.length).to.be.greaterThan(0)

        let firstProductName = productList[0].name
        let firstProductPrice = productList[0].price

        let middleProductIndex = Math.floor(productList.length/2)
        let middleProductName = productList[middleProductIndex].name
        let middleProductPrice = productList[middleProductIndex].price

        ServerestStore.addProductToList(firstProductName)
        cy.wait(3000)
        ShoppingList.isPageLoaded().should('be.true')

        ShoppingList.getProductList().then((shoppingListProducts) => {
            expect(shoppingListProducts.length).to.equal(1)
            expect(shoppingListProducts[0].name).to.equal(firstProductName)
            expect(shoppingListProducts[0].price).to.equal(firstProductPrice)

            let increaseButton = shoppingListProducts[0].increaseButton
            for(let i = 0; i < 2; i++){
                increaseButton.click()
            }
            let newTotal = ''
            let newPrice = ''
            ShoppingList.getProductByName(firstProductName).then((product) =>
            {
                newTotal = product.total,
                newPrice = product.price
                cy.log(`New total is ${newTotal}`)
                expect(newTotal).to.equal('3')
                expect(newPrice).to.equal(String(parseInt(productList[0].price) * 3));
            })
            cy.wait(3000)
        
            ShoppingList.clickOnBodyHomeButton()
            cy.wait('@getProducts')

            ServerestStore.addProductToList(firstProductName)
            cy.wait(2000)
            ShoppingList.isPageLoaded().should('be.true')

            ShoppingList.getProductByName(firstProductName).then((product) =>
            {
                newTotal = product.total,
                newPrice = product.price
                cy.log(`New total is ${newTotal}`)
                expect(newTotal).to.equal('4')
                expect(newPrice).to.equal(String(parseInt(firstProductPrice) * 4));

                ShoppingList.clickOnBodyHomeButton()
                cy.wait('@getProducts')
            })

        })

        ServerestStore.isPageLoaded().should('be.true')
        ServerestStore.addProductToList(middleProductName)
        cy.wait(2000)
        ShoppingList.isPageLoaded()

        ShoppingList.getProductList().then((shoppingListProducts) => {
            let firstProdInList = shoppingListProducts.find(product => product.name === firstProductName)
            let secondProdInList = shoppingListProducts.find(product => product.name === middleProductName)

            expect(firstProdInList.total).to.equal('4')
            expect(firstProdInList.price).to.equal(String(parseInt(firstProductPrice) * 4))

            expect(secondProdInList.total).to.equal('1')
            expect(secondProdInList.price).to.equal(middleProductPrice)

            ShoppingList.clickOnClearList()
            ShoppingList.isEmpty().should('be.true')
        })
    })
  })

  it('Should be able to add every product on the shopping list', () => {
    let productList = []
    ServerestStore.getProductList().then((products) => {
        productList = products
        
        productList.forEach(product => {
            ServerestStore.addProductToList(product.name)
            ShoppingList.isPageLoaded()
            ShoppingList.clickOnBodyHomeButton()
            cy.wait('@getProducts')
            cy.wait(100)
        })
        cy.wait(5000)
        
        ServerestStore.isPageLoaded()
        ServerestStore.clickOnHeaderShoppingList()
        ShoppingList.isPageLoaded().should('be.true')

        ShoppingList.getProductByName().then((addedProductList) => {
            // Tolerance of 5 for test in live server
            expect(productList.length - addedProductList.length).lessThan(5)
        })


    })
  })
})