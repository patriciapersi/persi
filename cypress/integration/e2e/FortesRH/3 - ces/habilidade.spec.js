describe('Habilidade', () => {
    const dados = {
        habilidade_nome: chance.word({ length: 10 }),
        habilidade_nome2: chance.word({ length: 10 }),
        colaborador_nome: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(dados.habilidade_nome)
            .insereHabilidade(dados.habilidade_nome)
            .navigate('/captacao/habilidade/list.action')
    });

    it('Inserir Habilidade', () => {
        cy
            .cadastraCHA(dados.habilidade_nome2)
            .successMsg('Habilidade inserida com sucesso')
        cy.contains(dados.habilidade_nome2).should('be.visible')
    });

    it('Inserir Habilidade - Já cadastrado', () => {
        cy
            .cadastraCHA(dados.habilidade_nome)
            .infoMsg('Já existe um Conhecimento, Habilidade ou Atitude com o nome "' + dados.habilidade_nome + '".')
    });

    it('Editar Habilidade', () => {
        cy
            .editarCHA(dados.habilidade_nome)
            .successMsg('Habilidade atualizada com sucesso')
        cy.contains(dados.habilidade_nome).should('be.visible')
    });

    it('Excluir Habilidade', () => {
        cy
            .excluir(dados.habilidade_nome)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Habilidade excluída com sucesso.')
        cy.contains(dados.habilidade_nome).should('not.exist')
    });
})    