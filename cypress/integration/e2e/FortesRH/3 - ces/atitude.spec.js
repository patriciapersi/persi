describe('Atitude', () => {
    const dados = {
        atitude_nome: chance.word({length: 10}),
        atitude_nome2: chance.word({length: 10}),
        colaborador_nome: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados.colaborador_nome)
            .insereAtitude(dados.atitude_nome)
            .navigate('/captacao/atitude/list.action')
    });

    it('Inserir Atitude', () => {
        cy
            .cadastraCHA(dados.atitude_nome2)
            .successMsg('Atitude Gravada com Sucesso!')
        cy.contains(dados.atitude_nome2).should('be.visible')
    });

    it('Inserir Atitude - Já cadastrado', () => {
        cy
            .cadastraCHA(dados.atitude_nome)
            .warningMsg('Já existe um conhecimento, habilidade ou atitude com o nome "' + dados.atitude_nome + '".')
    });

    it('Editar Atitude', () => {
        cy
            .editarCHA(dados.atitude_nome)
            .successMsg('Atitude atualizada com sucesso')
    });

    it('Excluir Atitude', () => {
        cy
            .excluir(dados.atitude_nome)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Atitude excluída com sucesso.')
        cy.contains(dados.atitude_nome).should('not.exist')
    });

    it('Excluir Atitude sem sucesso', () => {
        cy
            .excluir('Organizado')
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Não foi possível excluir a atitude.')
        cy.contains('Organizado').should('be.visible')
    });
})    