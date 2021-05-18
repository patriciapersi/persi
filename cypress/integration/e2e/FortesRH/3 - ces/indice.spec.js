describe('Indices', () => {
    const dados = {
        indice_nome: chance.sentence({ words: 2 }),
        indice_nome2: chance.sentence({ words: 2 }),
        indice_nome3: chance.sentence({ words: 2 }),
        valor: chance.integer({ min: 2000, max: 3500 }),
        data: chance.date({ string: true, american: false })
    }

    beforeEach('', () => {
        cy
            .insereIndices(dados.indice_nome)
            .insereIndicesComHistorico(dados.indice_nome2)
            .navigate('/cargosalario/indice/list.action')
    });

    it('Inserir Indice', () => {
        cy
            .cadastraIndice(dados)
            .successMsg('Índice Gravado com Sucesso!')
        cy.contains(dados.indice_nome3).should('be.visible')
    });

    it('Inserir Indice Integrado com o Fortes Pessoal', () => {
        cy
            .integraFortesPessoal()
            .loginByApi(Cypress.config('user_name'), Cypress.config('user_password'))
            .visit('/cargosalario/indice/list.action')
            .infoMsg('A manutenção do Cadastro de Índices deve ser realizada no Fortes Pessoal.')
    });

    it('Edição de Indice', () => {
        cy
            .editarIndice(dados.indice_nome)
            .successMsg('Índice Atualizado com Sucesso!')
        cy.contains(dados.indice_nome).should('be.visible')
    });

    it('Exclusão de Indice', () => {
        cy
            .excluir(dados.indice_nome)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Índice excluído com sucesso.')
        cy.contains(dados.indice_nome).should('not.exist')
    });

    it('Exclusão de Indice - Com Histórico', () => {
        cy
            .excluir(dados.indice_nome2)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Índice excluído com sucesso.')
        cy.contains(dados.indice_nome2).should('not.exist')
    });
})