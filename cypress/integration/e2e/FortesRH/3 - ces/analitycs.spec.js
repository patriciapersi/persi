describe('Analitycs de Cargos & Salários', () => {
    const colaborador = chance.name()

    beforeEach('', () => {
        cy
            .insereColaboradorComCompetencias(colaborador)
            .navigate('/cargosalario/historicoColaborador/painelIndicadoresCargoSalario.action')
    });

    it('Vagas Disponíveis', () => {
        cy
        .contains('Valor total da folha em').should('be.visible')
    });
});