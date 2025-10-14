import CreateAccountPage from "../../support/pages/create_account/create_account"
import LoginPage from "../../support/pages/login/login"
import ServerestStore from "../../support/pages/serverest_store/serverest_store"
import AdminHome from "../../support/pages/admin_home/admin_home"

const passwordMandatoryWarningRegEx = /Password não pode ficar em branco|Password é obrigatório/
const emailMandatoryWarningRegEx = /Email é obrigatório|Email não pode ficar em branco/
const nameMandatoryWarning = 'Nome é obrigatório'
const invalidEmailWarning = 'Email deve ser um email válido'
const invalidEmailOrPasswordWarning = 'Email e/ou senha inválidos'
const emailAlreadyInUseWarning = 'Este email já está sendo usado'
const RegisterSuccessMessage = 'Cadastro realizado com sucesso'

const normalUserName = 'NormalUser'
const adminUserName = 'AdminUser'

const numForEmails = Math.floor(Math.random() * 10000)
const validEmailNormalUser = `normaluser${numForEmails}@mail.com`
const validEmailAdminUser = `adminuser${numForEmails}@mail.com`
const defaultPassword = 'test123'

describe('Create and Use Accounts', () => {
  beforeEach(() => {
        cy.visit('https://front.serverest.dev/login')
  })

  it('Must not login without credetials', () => {
        LoginPage.submitForm()

        cy.contains(emailMandatoryWarningRegEx).should('be.visible')
        cy.contains(passwordMandatoryWarningRegEx).should('be.visible')
  })

  it('Must not create account without valid credentials', () => {
        CreateAccountPage.accessCreateAccountPage()
        CreateAccountPage.isPageLoaded().should('be.true')
        CreateAccountPage.submitForm()

        cy.contains(nameMandatoryWarning).should('be.visible')
        cy.contains(emailMandatoryWarningRegEx).should('be.visible')
        cy.contains(passwordMandatoryWarningRegEx).should('be.visible')
  })

  it('Must not create account with only name filled', () => {
        CreateAccountPage.accessCreateAccountPage()
        CreateAccountPage.isPageLoaded().should('be.true')
        CreateAccountPage.fillName(normalUserName)
        CreateAccountPage.submitForm()

        cy.contains(emailMandatoryWarningRegEx).should('be.visible')
        cy.contains(passwordMandatoryWarningRegEx).should('be.visible')
  })

    it('Email warning should appear until there\'s a valid email', () => {
        CreateAccountPage.accessCreateAccountPage()
        CreateAccountPage.isPageLoaded().should('be.true')
        // The following 2 scenarios will get no response from the server, because the email is not in valid format
        CreateAccountPage.fillForms(normalUserName, 'aaa', '')
        CreateAccountPage.submitForm()

        CreateAccountPage.fillForms(normalUserName, 'aaa@', '')
        CreateAccountPage.submitForm()

        // Now with a partylly valid email, the server will respond that email is invalid
        CreateAccountPage.fillForms(normalUserName, 'aaa@a', '')
        CreateAccountPage.submitForm()
        cy.contains(invalidEmailWarning).should('be.visible')
    })

    it('Must not create account with empty password field', () => {
        CreateAccountPage.accessCreateAccountPage()
        CreateAccountPage.isPageLoaded().should('be.true')
        CreateAccountPage.fillForms(normalUserName, validEmailNormalUser, '')
        CreateAccountPage.submitForm()
        cy.contains(passwordMandatoryWarningRegEx).should('be.visible')
    })

  it('Must create account with valid credentials and login', () => {
        CreateAccountPage.accessCreateAccountPage()
        CreateAccountPage.isPageLoaded().should('be.true')
        CreateAccountPage.fillForms(normalUserName, validEmailNormalUser, defaultPassword)
        CreateAccountPage.submitForm()
        cy.contains(RegisterSuccessMessage).should('be.visible')
        cy.wait(8000) // Enough time for the message to disappear
        ServerestStore.isPageLoaded().should('be.true')
        ServerestStore.clickOnLogout()
        LoginPage.isPageLoaded().should('be.true')
  })

  it('Must not login with inexistent or incomplete password', () => {
        LoginPage.fillForms(validEmailNormalUser, '')
        LoginPage.submitForm()
        cy.contains(passwordMandatoryWarningRegEx).should('be.visible')

        LoginPage.fillForms(validEmailNormalUser, 'incomplete')
        LoginPage.submitForm()
        cy.contains(invalidEmailOrPasswordWarning).should('be.visible')
  })

  it('Must login with valid credentials', () => {
        LoginPage.fillForms(validEmailNormalUser, defaultPassword)
        LoginPage.submitForm()
        ServerestStore.isPageLoaded().should('be.true')
  })

  it('Must not create admin account with email already in use', () => {
        CreateAccountPage.accessCreateAccountPage()
        CreateAccountPage.isPageLoaded().should('be.true')
        CreateAccountPage.checkCreateAsAdmin()
        CreateAccountPage.fillForms(adminUserName, validEmailNormalUser, defaultPassword)
        CreateAccountPage.submitForm()
        cy.contains(emailAlreadyInUseWarning).should('be.visible')
  })

  it('Must create admin account with valid credentials and login', () => {
        CreateAccountPage.accessCreateAccountPage()
        CreateAccountPage.isPageLoaded().should('be.true')
        CreateAccountPage.checkCreateAsAdmin()
        CreateAccountPage.fillForms(adminUserName, validEmailAdminUser, defaultPassword)
        CreateAccountPage.submitForm()
        cy.contains(RegisterSuccessMessage).should('be.visible')
        cy.wait(8000) // Enough time for the message to disappear
        AdminHome.isPageLoaded().should('be.true')
        AdminHome.clickOnLogout()
        LoginPage.isPageLoaded().should('be.true')
  })

  it('Must not login admin account with inexistent or incomplete password', () => {
        LoginPage.fillForms(validEmailAdminUser, '')
        LoginPage.submitForm()
        cy.contains(passwordMandatoryWarningRegEx).should('be.visible')

        LoginPage.fillForms(validEmailAdminUser, 'incomplete')
        LoginPage.submitForm()
        cy.contains(invalidEmailOrPasswordWarning).should('be.visible')
  })

  it('Must login admin account with valid credentials', () => {
        LoginPage.fillForms(validEmailAdminUser, defaultPassword)
        LoginPage.submitForm()
        AdminHome.isPageLoaded().should('be.true')
  })
})