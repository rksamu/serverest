
const  productURL = 'https://serverest.dev/produtos'
const  userURL = 'https://serverest.dev/usuarios'
const loginURL = 'https://serverest.dev/login'

function checkProductExist(product) {
    return cy.getProducts()
    .then((getProductsResponse) => {
        expect(getProductsResponse.status).to.be.equal(200)
        expect(getProductsResponse.body.produtos)
        .to.satisfy((products) => 
                products.some(p => 
                    p.nome === product.nome &&
                    p.preco === product.preco &&
                    p.descricao === product.descricao &&
                    p._id === product._id
                )
            )
        return cy.wrap(true)
    })
}

function createandCheckProduct(adminToken, product) {
    return cy.postAuthenticated(productURL, adminToken, product)
    .then((createResponse) => {
        expect(createResponse.status).to.be.equal(201)
        expect(createResponse.body.message)
        product._id = createResponse.body._id

        return checkProductExist(product)
        .then((productExists) => {
            expect(productExists).to.be.equal(true)
            return product._id
        })
    })
}

function deleteProductAndCheck(adminToken, product) {
    return cy.deleteAuthenticated(`${productURL}/${product._id}`, adminToken, product)
    .then((deleteProduct) => {
        expect(deleteProduct.status).to.be.equal(200)

        return cy.getProducts()
        .then((productsResponse) => {
            expect(productsResponse.body.produtos).to.not.satisfy((products) => 
                products.some(p => 
                    p.nome === product.nome &&
                    p.preco === product.preco &&
                    p.descricao === product.descricao &&
                    p._id === product._id
                )
            )
        })
    })
}

function modifyAndVerifyProduct(adminToken, productId, newProduct) {
    return cy.putProduct(adminToken, productId, newProduct)
    .then((putResponse) => {
        expect(putResponse.status).to.be.equal(200)
        expect(putResponse.body.message).to.be.equal('Registro alterado com sucesso')
        newProduct._id = productId
        return checkProductExist(newProduct)
        .then((modifiedProductExists) => {
            expect(modifiedProductExists).to.be.equal(true)
            return newProduct
        })
    })
}


describe('Use the endpoint /produtos', () => {

    before(() => {
        cy.request({
            method: 'POST',
            url: userURL,
            failOnStatusCode: false,
            body: {
                "nome": 'Admin3993',
                "email": 'adminmail3993@admail.com',
                "password": 'test123',
                "administrador": "true"
            }
        }).then((adminCreateResponse) => {
            return cy.request({
                method: 'POST',
                url: loginURL,
                body: {
                    "email": 'adminmail3993@admail.com',
                    "password": 'test123',
                }
            }).then((loginResponse) => {
                Cypress.env('adminToken', loginResponse.body.authorization)
            })
        })

        cy.postUser({
                "nome": 'Normal3993',
                "email": 'normalmail3993@normal.com',
                "password": 'test123',
                "administrador": "false"
        }).then((normalCreateResponse) => {
            return cy.request({
                method: 'POST',
                url: loginURL,
                body: {
                    "email": 'normalmail3993@normal.com',
                    "password": 'test123',
                }
            }).then((loginResponse) => {
                Cypress.env('normalToken', loginResponse.body.authorization)
            })
        })
    })

    it('Create a single product, verify its existence and delete it.', () =>{
        const adminToken = Cypress.env('adminToken')
        cy.fixture('products.json').then((productsBase) => {
            let product = productsBase.products[0]
            createandCheckProduct(adminToken, product).then((productId) => {
                product._id = productId
                deleteProductAndCheck(adminToken, product)
            })
        })
    })
    it('Create, verify and delete many objects.', () => {
        const adminToken = Cypress.env('adminToken')
        cy.fixture('products.json').then((productsBase) => {
            productsBase.products.forEach((product) => {
                createandCheckProduct(adminToken, product).then((productId) =>{
                    product._id = productId
                    deleteProductAndCheck(adminToken, product)
                })
            })
        })
    })
    it('Create, modify and verify changes', () =>{
        const adminToken = Cypress.env('adminToken')
        cy.fixture('products.json').then((productsBase) => {
            let product = productsBase.products[5]
            createandCheckProduct(adminToken, product).then((productId) => {
                modifyAndVerifyProduct(adminToken, productId, productsBase.products[6])
                .then((newProduct) => {
                    newProduct._id = productId
                    deleteProductAndCheck(adminToken, newProduct)
                })
            })
        })
    })
    it('Attempt to create a product with regular user and fail', () => {
        const normalToken = Cypress.env('normalToken')
        cy.fixture('products.json').then((productsBase) => {
            let product = productsBase.products[10]
            cy.postProduct(normalToken, product)
            .then((postProductResponse) => {
                expect(postProductResponse.status).to.be.equal(403)
                expect(postProductResponse.body.message).to.be.equal("Rota exclusiva para administradores")
            })
        })
    })
})