describe('Conhecimento', () => {
    const dados = {
        conhecimento_nome: chance.word({ length: 10 }),
        conhecimento_nome2: chance.word({ length: 10 }),
        colaborador_nome: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados.colaborador_nome)
            .insereConhecimento(dados.conhecimento_nome)
            .navigate('/captacao/conhecimento/list.action')
    });

    it('Inserir Conhecimento', () => {
        cy
            .cadastraCHA(dados.conhecimento_nome2)
            .successMsg('Conhecimento cadastrado com sucesso.')
        cy.contains(dados.conhecimento_nome2).should('be.visible')
    });

    it('Inserir Conhecimento - Já cadastrado', () => {
        cy
            .cadastraCHA(dados.conhecimento_nome)
            .infoMsg('Já existe um Conhecimento, Habilidade ou Atitude com o nome "' + dados.conhecimento_nome + '".')
    });

    it('Editar Conhecimento', () => {
        cy
            .editarCHA(dados.conhecimento_nome)
            .successMsg('Conhecimento atualizado com sucesso.')
        cy.contains(dados.conhecimento_nome).should('be.visible')
    });

    it('Excluir Conhecimento', () => {
        cy
            .excluir(dados.conhecimento_nome)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Conhecimento excluído com sucesso.')
        cy.contains(dados.conhecimento_nome).should('not.exist')
    });

    it('Excluir Conhecimento sem sucesso', () => {
        cy
            .excluir('Java')
            .popUpMessage('Confirma exclusão?')
            .warningMsg('Não foi possível excluir o conhecimento.')
        cy.contains('Java').should('be.visible')
    });
})    