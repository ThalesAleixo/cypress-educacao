const {
  gerarCpf
} = require("../../src/utils/cpf")

describe('home', () => {
  it('must sucess load', () => {
    cy.visit('https://mais-educacao.tharlei.com')
    cy.get('h1')
    .should("contain", "+A Educação - Full Stack Web Developer")
  })
  
})
describe('list students', () => {
  it('must sucess load', () => {
    cy.visit('https://mais-educacao.tharlei.com/alunos')
    cy.get(':nth-child(1) > .header > .header-text')
    .should("contain", "Registro Acadêmico")
  })
  it('must create new student and show in the list', () => {

    //Arrange
    const name = "Aluno " + Math.random().toString(36).substring(7)
    const email = "aluno" + Math.random().toString(36).substring(7) + "@hotmail.com"
    const ra = Math.random().toString(36).substring(7)
    const cpf = gerarCpf()

    //Act
    cy.visit('https://mais-educacao.tharlei.com/alunos')
    .wait(1000)
    cy.get('.justify-end > a > .v-btn')
    .click()
    .wait(1000)

    cy.get("input")
    .eq(0)
    .clear()
    .type(name)

    cy.get("input")
    .eq(1)
    .clear()
    .type(email)

    cy.get("input")
    .eq(2)
    .clear()
    .type(ra)

    cy.get("input")
    .eq(3)
    .clear()
    .type(cpf)

    cy.get('.bg-success')
    .click()
    .wait(1000)

    cy.get('.rows-input__wrapper')
    .click()
    cy.get('.select-items > :nth-child(3)')
    .click()
    
    //Assert
    cy.get('.vue3-easy-data-table td')
    .should("include.text", name)
    .should("include.text", ra)
    
  })
})
