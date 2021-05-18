describe('Tentativas de Login no Módulo Externo', () => {
    const dados = {
        candidato1: chance.name(),
        candidato2: chance.name(),
        candidato3: chance.name()
    }

    beforeEach('', () => {
        cy
            .inserecandidato(dados.candidato1)
            .inserecandidato(dados.candidato2)
            .insereCandidato(dados.candidato)
            .visit('/externo/prepareLogin.action?empresaId=1')
    })

    it('Captcha Ativo', () => {
        cy
            .exec_sql('update parametrosdosistema set utilizarcaptchanomoduloexterno = true')
            .loggedIn('06060722334', '1234')
            .warningMsgExterno('Não foi possível efetuar login. Confirme que você não é um robô')
    })

    it('Acessar modulo externo com login e senha com 2 candidatos com mesmo CPF', () => {
        cy
            .loggedIn('06060722334', '1234')
            .welcomeExterno('Bem vindo(a)')
        cy.contains(dados.candidato2).should('be.visible')
    })

    it('Acessar modulo externo - Senha Inválida', () => {
        cy
            .loggedIn('06060722334', '123456')
            .popUpMessage('Senha não confere.')
    })

    it('Acessar modulo externo - Exige Aceite LGPD', () => {
        cy
            .exec_sql("update empresa set exigiraceitepsi = true")
            .exec_sql("update empresa set politicaseguranca = 'Teste'")
            .loggedIn('06060722334', '1234')
        cy
            .get('.ui-button-text').click()
            .popUpMessage('Você precisa aceitar o Termo de Privacidade e Política de Segurança.')
        cy.contains('Li e aceito o Termo de Privacidade e Política de Segurança').click()
        cy.get('.ui-button-text').click()
    })
})