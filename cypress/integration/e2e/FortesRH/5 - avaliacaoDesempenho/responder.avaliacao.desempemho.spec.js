describe('Responder Avaliação de Desempenho', () => {
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
        cy.navigate('/avaliacao/desempenho/avaliacaoDesempenhoQuestionarioList.action')
    });

    it('Responder Avaliação', () => {

            cy.inseremodeloAvaliacaoDesempenho(aval.Titulo)
            .insereColaborador(aval.Colaborador)
            .insereAvaliacaoDesempenho(aval.Titulo)
            .insereColaboradorNaAvaliacao(aval.Titulo, aval.Colaborador)  
            .visit('/avaliacao/desempenho/list.action')
            .clicaBotaoContinuar()
            .acao('Editar', aval.Titulo)
            .clicaBotao('Gravar')      
            cy.exec_sql("update avaliacaodesempenho set liberada = true")        
            .visit('/avaliacao/desempenho/avaliacaoDesempenhoQuestionarioList.action')
            .reload()
            cy.responderAvaliacaoDesempenho(aval)
            .successMsg('Respostas gravadas com sucesso.')

    });
});