import LoginPage from "../../support/pages/login/login"
import AdminHome from "../../support/pages/admin_home/admin_home"
import AdminRegisterUser from "../../support/pages/admin_register_user/admin_register_user"
import AdminRegisterProduct from "../../support/pages/admin_register_product/admin_register_product"

const adminUserEmail = 'testuser10102@testmail.com'
const password = 'test123'

const userListTitle = 'Lista dos usuários'
const productListTitle = 'Lista dos Produtos'

describe('Use an Admin Account on the ServeRest System', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://serverest.dev/usuarios').as('getUsers')
    cy.intercept('GET', 'https://serverest.dev/produtos').as('getProducts')

    cy.visit('https://front.serverest.dev/login')
    
    LoginPage.fillForms(adminUserEmail, password)
    LoginPage.submitForm()

    AdminHome.isPageLoaded().should('be.true')
  })

  it('Should stay at home page when clicking in Home Button', () => {
    AdminHome.clickOnHome()
    AdminHome.isPageLoaded().should('be.true')
  })

  it('Should be able to register and delete users.', () => {
    let username = 'UserTest3226'
    let email = 'usertest3226@testmail.com'
    AdminHome.clickOnHeaderRegisterUsers()
    AdminRegisterUser.isPageLoaded().should('be.true')
    AdminRegisterUser.fillForms(username, email, password)
    AdminRegisterUser.submitForm()

    cy.wait('@getUsers')
    cy.wait(1000)

    cy.contains(userListTitle).should('exist')
    cy.contains(username).should('exist')
    cy.contains(email).should('exist')
    cy.contains(password).should('exist')

    cy.contains(username)
        .parent()
        .find('[class="btn btn-danger"]').then((deleteButton) => {
            cy.get(deleteButton).click()
            cy.wait('@getUsers')
            cy.contains(username).should('not.exist')
            cy.contains(email).should('not.exist')
        })
    
    AdminHome.clickOnHome()
    AdminHome.isPageLoaded().should('be.true')

    AdminHome.clickOnHeaderListUsers()
    cy.wait('@getUsers')
    cy.wait(1000)

    cy.contains(userListTitle).should('exist')
  })

  it('Should be able to Register and Delete products',() => {
    let productName = 'Prodtest-07'
    let productPrice = '1'
    let productDescription = 'Desctest-07'
    let productQuantity = '10'

    AdminHome.clickOnHeaderRegisterProducts()
    AdminRegisterProduct.isPageLoaded().should('be.true')

    AdminRegisterProduct.submitForm()

    cy.contains('Nome é obrigatório').should('exist')
    cy.contains('Preco é obrigatório').should('exist')
    cy.contains('Descricao é obrigatório').should('exist')
    cy.contains('Quantidade é obrigatório').should('exist')

    AdminRegisterProduct.fillForms(productName, 
                                    productPrice, 
                                    productDescription, 
                                    productQuantity)
    AdminRegisterProduct.submitForm()
    cy.wait('@getProducts')
    
    cy.contains(productListTitle).should('exist')
    cy.contains(productName).should('exist')
    cy.contains(productDescription).should('exist')
    cy.contains(productName).parent()
                            .find('[class="btn btn-danger"]')
                            .then((deleteButton) => {
        cy.get(deleteButton).click()
        cy.wait('@getProducts')
        cy.contains(productName).should('not.exist')
    })
    
    AdminHome.clickOnHome()
    AdminHome.isPageLoaded().should('be.true')

    AdminHome.clickOnHeaderListProducts()
    cy.wait('@getProducts')
    cy.contains(productListTitle).should('exist')
  })

  it('Buttons in Admin Home should open their respective pages.', () => {
    // Register Users or "Cadastrar Usuários"
    AdminHome.clickOnBodyRegisterUsers()
    AdminRegisterUser.isPageLoaded().should('be.true')
    AdminRegisterUser.clickOnHome()
    AdminHome.isPageLoaded().should('be.true')

    // List Users or "Listar Usuários"
    AdminHome.clickOnBodyListUsers()
    cy.wait('@getUsers')
    cy.contains(userListTitle).should('exist')
    AdminHome.clickOnHome()
    AdminHome.isPageLoaded().should('be.true')

    // Register Products or "Cadastro de Produtos"
    AdminHome.clickOnBodyRegisterProducts()
    AdminRegisterProduct.isPageLoaded().should('be.true')
    AdminRegisterProduct.clickOnHome()
    AdminHome.isPageLoaded().should('be.true')

    // List Products or "Lista dos produtos"
    AdminHome.clickOnBodyListProducts()
    cy.wait('@getProducts')
    cy.contains(productListTitle).should('exist')
    AdminHome.clickOnHome()
    AdminHome.isPageLoaded().should('be.true')
  })
})