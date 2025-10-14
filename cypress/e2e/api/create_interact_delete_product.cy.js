const  productURL = 'https://serverest.dev/produtos'
const  userURL = 'https://serverest.dev/usuarios'
const loginURL = 'https://serverest.dev/login'


function getProductCount() {
    cy.request({
            method: 'GET', 
            url: 'https://serverest.dev/produtos'
    }).then((response) => {
            cy.log(`User count: ${response.body.quantidade}`)
            cy.wrap(response.body.quantidade).as('userCount')
    })
}

describe('Create accounts and verify they were created', () => {
    let adminToken = null
    let normalToken = null

    beforeEach(() => {
        if (adminToken == null) {
            cy.request({
                method: 'POST',
                url: userURL,
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
                })
            }).then((loginResponse) => {
                adminToken = loginResponse.body.authorization
            })
        }

        if (normalToken == null) {
            cy.request({
                method: 'POST',
                url: userURL,
                body: {
                    "nome": 'Normal3993',
                    "email": 'normalmail3993@normal.com',
                    "password": 'test123',
                    "administrador": "false"
                }
            }).then((normalCreateResponse) => {
                return cy.request({
                    method: 'POST',
                    url: loginURL,
                    body: {
                        "email": 'normalmail3993@normal.com',
                        "password": 'test123',
                    }
                })
            }).then((loginResponse) => {
                normalToken = loginResponse.body.authorization
            })
        }
    })

    it('Must create a product, confirm it exists and use it with a normal user.', () =>{

    })
})
