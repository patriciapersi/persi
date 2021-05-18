describe('Acompanhamento do Período de Experiencia', () => {
    const colaborador = {
        avaliacao: chance.sentence({ words: 4 }),
        nome: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(colaborador.nome)
            .navigate('/avaliacao/avaliacaoExperiencia/periodoExperienciaQuestionarioList.action')
    });

    it('Inserir Acompanhamento do Período de Experiencia', () => {
        cy
            .inseremodeloAvaliacaoPeriodoExperiencia(colaborador.avaliacao)
            .responderAcompanhamentoPeriosoExperiencia(colaborador)
        cy.contains('80%').should('be.visible')
    });
});