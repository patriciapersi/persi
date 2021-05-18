describe('Ocorrencias de Empregados', () => {

    const ocorrencia = {
        nome: chance.word(),
        name: chance.word(),
        colaborador_nome: chance.name(),
        data: '01/01/2021'
    }

    const ocorrencias = {
        nome: chance.word(),
        name: chance.word(),
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

    it('Cadastrar Ocorrência Empregados', () => {
        cy
            .cadastrarOcorrenciaNova(ocorrencias)
        cy.contains(ocorrencias.name).should('be.visible')
    });
});