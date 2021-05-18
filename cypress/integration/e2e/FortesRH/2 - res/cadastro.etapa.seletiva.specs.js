describe('Etapas Seletivas', () => {
    const etapa = {
        nome: chance.word(),
        nome2: chance.word(),
        analise: 'Não'
    }

    const etapa2 = {
        nome: chance.word(),
        analise: 'Sim'
    }

    beforeEach('', () => {
        cy
            .insereEtapaSeletiva(etapa.nome2)
            .navigate('/captacao/etapaSeletiva/list.action')
    });

    it('Inserir Etapa Seletiva', () => {
        cy
            .cadastraEtapaSeletiva(etapa)
            .validaTitulo('Etapas Seletivas')
        cy.contains(etapa.nome).should('exist')
        cy.contains('Análise Comportamental').should('not.exist')
    });

    it('Inserir Etapa Seletiva - Analise Comportamental', () => {
        cy
            .cadastraEtapaSeletiva(etapa2)
            .validaTitulo('Etapas Seletivas')
        cy.contains(etapa2.nome).should('exist')
        cy.contains('Análise Comportamental').should('exist')
    });

    it('Editar Etapa Seletiva', () => {
        cy
            .editar(etapa.nome2)
            .clicaBotao('Gravar')
        cy.contains(etapa.nome2).should('exist')
        cy.contains('Análise Comportamental').should('not.exist')
    });

    it('Excluir Etapa Seletiva', () => {
        cy
            .excluir(etapa.nome2)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Etapa Seletiva excluída com sucesso.')
            .infoMsg('Sem itens a serem listados.')
    });
});