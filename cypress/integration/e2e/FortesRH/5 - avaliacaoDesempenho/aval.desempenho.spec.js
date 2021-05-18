describe('Avaliação de Desempenho', () => {
    const aval = {
        Titulo: chance.sentence({ words: 3 }),
        PeriodoInicial: '01/08/2020',
        PeriodoFinal: '31/08/2020',
        ModeloAvaliacao: 'Não',
        PermiteAutoavaliacao: 'Sim',
        Anonima: 'Não',
        Colaborador: chance.name()
    }

    beforeEach('', () => {
        cy
            .navigate('/avaliacao/desempenho/list.action')
    });

    it('Inserir Avaliação de Desempenho', () => {
        cy
            .insereColaborador(aval.Colaborador)
            .cadastrarAvaliacaoDesempenho(aval)
            .successMsg('Gravado com sucesso.')
            .clicaBotao('Voltar')
        cy.contains(aval.Titulo).should('be.visible')
    });

    it('Inserir Talentos na Avaliação de Desempenho - Acima do limite', () => {
        cy
            .insere_X_Colaborador(51)
            .insereAvaliacaoDesempenho(aval.Titulo)
            .reload()
            .acao('Participantes', aval.Titulo)
            .cadastrarParticipantes()
        cy.contains('Não é possível realizar esse procedimento, pois serão vinculados 51 avaliados com 51 avaliadores, gerando 2601 registros a serem gravados. Isso poderia causar uma inconsistência.')
            .should('be.visible')
    });

    it('Inserir Talentos na Avaliação de Desempenho - Não Aceita Auto Avaliação', () => {
        cy
            .insereColaborador(aval.Colaborador)
            .insereAvaliacaoDesempenho_NaoPermiteAutoAvaliacao(aval.Titulo)
            .reload()
            .acao('Participantes', aval.Titulo)
            .cadastrarParticipantes()
        cy.contains('A avaliação não permite autoavaliação')
        .should('be.visible')
    });

    it('Excluir Avaliação de Desempenho', () => {
        cy
            .insereAvaliacaoDesempenho(aval.Titulo)
            .reload()
            .acao('Excluir', aval.Titulo)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Avaliação de desempenho excluída com sucesso.')
        cy.contains(aval.Titulo)
            .should('not.exist')
    });

    it('Liberar Avaliação de Desempenho em Lote', () => {
        cy
            .insereAvaliacaoDesempenho(aval.Titulo)
            .reload()
            .liberarPesquisaEmLote()
            cy.contains("Não foi possível realizar a operação 'Liberar avaliações em lote': Existem avaliações com número insuficiente de participantes ou avaliação que não permite a autoavaliação com apenas um participante.")
                .should('be.visible')
    });
});