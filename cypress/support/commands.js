Cypress.Commands.add('postAuthenticated', (url, token, body) => {
    return cy.request({
        method: 'POST',
        url: url,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: body,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('deleteAuthenticated', (url, token, body) => {
    return cy.request({
        method: 'DELETE',
        url: url,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: body,
        failOnStatusCode: false
    })
})

Cypress.Commands.add('getUsers', () => {
    return cy.request({
            method: 'GET',
            url: 'https://serverest.dev/usuarios'
        })
    })
            
Cypress.Commands.add('postUser', (user) => {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        failOnStatusCode: false,
        body: user
    })
})

Cypress.Commands.add('getProducts', () => {
    return cy.request({
        method: 'GET',
        url: 'https://serverest.dev/produtos'
    })
})

Cypress.Commands.add('postProduct', (token, product) => {
    return cy.request({
        method: 'POST',
        url: 'https://serverest.dev/produtos',
        failOnStatusCode: false,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: product
    })
})

Cypress.Commands.add('putProduct', (token, productId, newInfo) => {
    return cy.request({
        method: 'PUT',
        url: `https://serverest.dev/produtos/${productId}`,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        body: newInfo
    })
})