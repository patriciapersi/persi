describe('Tentativas de Login no Módulo Externo', () => {
    const candidato = {
        nome: chance.name(),
        cpf: '34425164555',
        naturalidade: chance.city(),
        fone: chance.phone({ country: "br" }),
        senha: chance.word({ length: 5 }),
        sexo: 'Feminino'
    }

    beforeEach('', () => {
        cy
            .visit('/externo/prepareLogin.action?empresaId=1')
    })

    it('Inserir candidato', () => {
        cy.contains('Quero me cadastrar').should('be.visible').click()
        cy
            .preencheDadosCandidato(candidato)
            .get('#aba6 > a').click()
            .get('#gravarModuloExterno').click()
            .popUpMessage('Dados cadastrados com sucesso.')

            
    cy.exec_sql("select * from candidato where nome = '" + candidato.nome + "'").then(({ rows }) => rows[0].id).then(candidatoId => {
        cy.log(`O candidato ${candidato.nome} possui o ID ${candidatoId}`)
    });
    })
})