describe('Pesquisas', () => {
    const pesquisas = {
        nome: chance.sentence({ words: 3 }),
        data_inicial: '01/10/2020',
        data_final: '31/10/2020',
        monitoramento: 'Sim',
        colaborador_nome: chance.name(),
        perguntas: chance.sentence(),
        parcial: 'Sim'
    }
    const pesquisa = {
        nome: chance.sentence({ words: 3 }),
        data_inicial: '01/10/2020',
        data_final: '31/10/2020',
        perguntas: chance.sentence()
    }
    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(pesquisas.colaborador_nome)
            .navigate('/pesquisa/pesquisa/list.action')
    });

    it('Inserir Pesquisa Monitoramento de Saúde', () => {
        cy
            .cadastrarPesquisa(pesquisas)
            .cadastrarPergunta(pesquisas)
        cy.contains('Monitoramento de Saúde').should('be.visible')
        cy.contains(pesquisas.nome).should('be.visible')
    });

    it('Inserir Pesquisa Normal', () => {
        cy
            .cadastrarPesquisa(pesquisa)
            .cadastrarPergunta(pesquisa)
        cy.contains('Monitoramento de Saúde').should('not.exist')
        cy.contains(pesquisa.nome).should('be.visible')
    });

    it('Responder Pesquisa', () => {
        cy
            .ativaPaginacaoPesquisa()
            .PesquisaLiberadaCom50Perguntas(pesquisa.nome)
            .reload()
            .responderPesquisa(pesquisa)
            .infoMsg('Respostas gravadas com sucesso.')
            .clicaBotao('Voltar')
        cy.contains('1 colaboradores/registros. Respondeu Pesquisa: 1.0 (100,00 %). Não Respondeu: 0.0 (0,00 %)').should('be.visible')
    });

    it('Responder Pesquisa Parcial', () => {
        cy
            .ativaPaginacaoPesquisa()
            .PesquisaLiberadaCom50Perguntas(pesquisas.nome)
            .reload()
            .responderPesquisa(pesquisas)
            .infoMsg('Respostas gravadas com sucesso.')
    });

    it('Excluir Respostas em Lote', () => {
        cy
            .ativaPaginacaoPesquisa()
            .PesquisaLiberadaCom50Perguntas(pesquisa.nome)
            .reload()
            .responderPesquisa(pesquisa)
            .excluirRespostasLote()
            .popUpMessage('Confirma remoção das respostas selecionadas?')
            .infoMsg('Respostas dos talentos selecionados removidas com sucesso.')
        cy.contains('Excluir Respostas').should('be.visible').and('not.be.enabled')
        cy.contains('1 colaboradores/registros. Respondeu Pesquisa: 0.0 (0,00 %). Não Respondeu: 1.0 (100,00 %)').should('be.visible')
    });
});