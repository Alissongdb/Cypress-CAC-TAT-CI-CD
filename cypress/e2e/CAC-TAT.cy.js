/// <reference types="cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {

    cy.visit('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')

  })

  it('Verifica o titulo da aplicacao', () => {

    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })

  it('Preenche os campos obrigatorios e envia o formulario', () => {

    const longText = Cypress._.repeat('testeRepeat', 10)

    cy.get('#firstName')
      .type('Alisson')

    cy.get('#lastName')
      .type('Gabriel')

    cy.get('#email')
      .type('testeemail@gmail.com')

    cy.get('#open-text-area')
      .type(longText, { delay: 0 })

    cy.get('button[type="submit"]')
      .click()

    cy.get('.success')
      .should('be.visible')

  })

  it('Exibe mensagem de erro ao submeter formulario com email invalido', () => {

    cy.get('#firstName')
      .type('Alisson')

    cy.get('#lastName')
      .type('Gabriel')

    cy.get('#email')
      .type('testeemail@gmail,com')

    cy.get('#open-text-area')
      .type('teste')

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com um valor nao numerico', () => {

    cy.get('#phone')
      .type('abc')
      .should('have.value', '')

  })

  it('Exibr mensagem de erro quando telefone e obrigatorio mas nao e preenchido antes de submeter o formulario', () => {
    cy.get('#firstName')
      .type('Alisson')

    cy.get('#lastName')
      .type('Gabriel')

    cy.get('#email')
      .type('testeemail@gmail.com')

    cy.get('#open-text-area')
      .type('teste')

    cy.get('[for="phone-checkbox"]')
      .click()

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')

  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#firstName')
      .type('Alisson')
      .should('have.value', 'Alisson')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Gabriel')
      .should('have.value', 'Gabriel')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('testeemail@gmail.com')
      .should('have.value', 'testeemail@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')

  })

  it('Exibe mensagem de erro ao submeter formulario sem preencher os campos obrigatorios', () => {

    cy.get('button[type="submit"]')
      .click()

    cy.get('.error')
      .should('be.visible')

  });

  it('Envia o formulario com sucesso usando um comando customizado', () => {

    const data = {
      firstName: 'Alisson',
      lastName: 'Gabriel',
      email: 'Alissontestee2e@gmail.com',
      text: 'TESTE'
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success')
      .should('be.visible')

  })

  it('Seleciona um produto por seu texto', () => {

    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')

  })

  it('Seleciona um produto por seu valor', () => {

    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')

  })

  it('Seleciona um produto pelo seu index', () => {

    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')

  })

  it('marcando um tipo de atendimento', () => {

    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')

  })

  it('Marcar e desmarcar 1 Contato', () => {

    cy.get('#email-checkbox')
      .should('not.be.checked')
      .check()
      .should('be.checked')

    cy.get('#email-checkbox')
      .should('be.checked')
      .uncheck()
      .should('not.be.checked')

  })

  it('Marcar e desmarcar todo os Contatos', () => {

    cy.get('input[type="checkbox"]')
      .should('not.be.checked')
      .check()
      .should('be.checked')

    cy.get('input[type="checkbox"]')
      .should('be.checked')
      .uncheck()
      .should('not.be.checked')

  })

  it('Marcar todos e desmarcar ultimo Contatos', () => {

    cy.get('input[type="checkbox"]')
      .should('not.be.checked')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Anexar arquivo', () => {

    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .should(($input) => {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  })

  it.only('Verificar outra aba do navegador', () => {

    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
      .should('be.visible', 'Talking About Testing')
  })



});


























