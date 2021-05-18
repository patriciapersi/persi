describe('Telas', () => {

    it('Ferias', () => {
        cy
            .navigate('/geral/colaborador/prepareRelatorioFerias.action')
            .validaTitulo('Férias')
    });

    it('Ocorrências', () => {
        cy
            .navigate('/geral/ocorrencia/prepareRelatorioOcorrencia.action')
            .validaTitulo('Ocorrências')
    });

    it('Turnover', () => {
        cy
        .navigate('/indicador/indicadorTurnOver/prepare.action')
        .validaTitulo('Turnover (rotatividade de talentos)')
        .get('#btnRelatorio').contains('Relatório')
    });

    it('Talentos por Cargo', () => {
        cy
            .navigate('/cargosalario/cargo/prepareRelatorioColaboradorCargo.action')
            .validaTitulo('Talentos por Cargo')
            .get('#exibirSalario').should('be.visible')
    });

})





