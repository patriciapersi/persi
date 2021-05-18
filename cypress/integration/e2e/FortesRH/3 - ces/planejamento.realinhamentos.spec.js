describe('Planejamento de Realinhamentos', () => {
    const reajuste = {
        nome: chance.word(),
        nome2: chance.word(),
        nome3: chance.word(),
        colaborador: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereReajustePorColaborador(reajuste.nome3, true)
            .insereReajustePorColaborador(reajuste.nome2, false)
            .insereColaboradorComCompetencias(reajuste.colaborador)
            .navigate('/cargosalario/tabelaReajusteColaborador/list.action')
    });

    it('Cancelar Reajuste', () => {
        cy
            .acao('Cancelar Reajuste', reajuste.nome3)
            .popUpMessage('Tem certeza que deseja desfazer os realinhamentos?')
            .successMsg('Cancelamento efetuado com sucesso.')
    });

    it('Inserir Reajuste', () => {
        cy
            .cadastrarReajuste(reajuste)
        cy.contains(reajuste.nome).should('be.visible')
    });

});