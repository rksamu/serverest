const  userURL = 'https://serverest.dev/usuarios'
const loginURL = 'https://serverest.dev/login'

const registerSuccessMessage = 'Cadastro realizado com sucesso'
const loginSuccessMessage = 'Login realizado com sucesso'
const deleteSuccessMessage = 'Registro excluído com sucesso'
const userNotFound = 'Usuário não encontrado'

function createValidateAndLogin(user, admin) {

    let userId = ''
    let userBearerToken = ''
    
    return cy.request({
        method: 'POST',
        url: userURL,
        body: {
            "nome": user.name,
            "email": user.email,
            "password": user.password,
            "administrador": admin ? "true" : "false"
            }
    }).then((createResponse) => {
        expect(createResponse.status).to.be.equal(201)
        expect(createResponse.body.message).to.be.equal(registerSuccessMessage)
        userId = createResponse.body._id

        return cy.request({
            method: 'GET',
            url: `${userURL}/${userId}`
        }).then((verifyResponse) =>{
            expect(verifyResponse.status).to.be.equal(200)
            expect(verifyResponse.body.nome).to.be.equal(user.name)
            expect(verifyResponse.body.email).to.be.equal(user.email)
            expect(verifyResponse.body.password).to.be.equal(user.password)
            expect(verifyResponse.body.administrador).to.be.equal(admin ? "true" : "false")
            return cy.request({
                method: 'POST',
                url: loginURL,
                body: {
                    'email': user.email,
                    'password': user.password
                }
            }).then((loginResponse) => {
                expect(loginResponse.status).to.be.equal(200)
                expect(loginResponse.body.message).to.be.equal(loginSuccessMessage)
                userBearerToken = loginResponse.body.authorization
                return cy.wrap({
                    "userId" : userId,
                    "userToken" : userBearerToken
                })
            })
        })
    })
}

function deleteUser(userId) {
    return cy.request({
        method: 'GET',
        url: `${userURL}/${userId}`
    }).then((userExists) => {
        expect(userExists.status).to.be.equal(200)

        return cy.request({
            method: 'DELETE',
            url: `${userURL}\/${userId}`
        }).then((deleteResponse) => {
            expect(deleteResponse.status).to.be.equal(200)
            expect(deleteResponse.body.message).contains(deleteSuccessMessage)
            
            return cy.request({
                method: 'GET',
                url: `${userURL}/${userId}`,
                failOnStatusCode: false
            }).then((verifyResponse) => {
                expect(verifyResponse.status).to.be.equal(400)
                expect(verifyResponse.body.message).to.equal(userNotFound)
                return cy.wrap(true)
            })
        })
    })
}

function getUserCount() {
    cy.request({
            method: 'GET', 
            url: userURL
    }).then((response) => {
            cy.log(`User count: ${response.body.quantidade}`)
            cy.wrap(response.body.quantidade).as('userCount')
    })
}

describe('Create accounts and verify they were created', () => {
    let initialUserCount = 0;

    beforeEach(() => {
        getUserCount()
        cy.get('@userCount').then((count) => {
            initialUserCount = count
        })
    })

    it('Must create an user, verify it exists and perform login with its credentials and then delete it', () => {
        cy.fixture('users.json').then((users) => {
            const firstUser = users.users[0]
            createValidateAndLogin(firstUser, false).then((userInfo) => {
                deleteUser(userInfo.userId).should('be.true')
            })
        })
    })

    it('Must be able to perform the first test on many users', () => {
        var userIdList = []
        cy.fixture('users.json').then((users) => {
            const creationPromises = users.users.map((user, index) => {
                return createValidateAndLogin(user, index % 2 == 0).then((userCreated) => {
                    userIdList.push(userCreated.userId)
                    cy.log(userIdList)
                })
            })

            return Cypress.Promise.all(creationPromises)
        }).then(() => {
            getUserCount()
            cy.get('@userCount').then((currentUserCount) => {
                expect(currentUserCount - userIdList.length).to.equal(initialUserCount)
            })

            userIdList.forEach((userId) => {
                cy.log(`Deleting user ${userId}`)
                deleteUser(userId).should('be.true')
            })
        })

    })
})
