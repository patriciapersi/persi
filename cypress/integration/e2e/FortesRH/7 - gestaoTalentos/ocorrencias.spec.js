describe('Ocorrencias de Empregados', () => {

    const ocorrencias = {
        nome: chance.word({ length: 5 }),
        name: chance.word({ length: 5 }),
        colaborador_nome: chance.name(),
        data: '01/04/2021'
    }

    beforeEach('', () => {
        cy
            .insereOcorrencia(ocorrencias.nome)
            .insereOcorrencia(ocorrencias.name)
            .insereColaborador(ocorrencias.colaborador_nome)
            .insereOcorrenciaColaborador(ocorrencias)
            .navigate('/geral/colaboradorOcorrencia/list.action')
    });

    it('Cadastrar Ocorrência para Empregados', () => {
        cy
            .cadastrarOcorrenciaNova(ocorrencias)
        cy.contains(ocorrencias.name).should('be.visible')
    });
});