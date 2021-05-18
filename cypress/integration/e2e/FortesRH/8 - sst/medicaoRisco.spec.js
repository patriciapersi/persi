describe.skip('Funcionalidade Medicão de Risco', () => {
    const medicao = {
        descricao: 'Medicao',
        dataMedicao: '01/01/2021',

        nomeAmbiente: chance.word(),
        nomeProfissional: chance.name()
    }

    beforeEach('', () => {
        cy
            .inserirAmbiente(medicao.nomeAmbiente)
            .navigate('/sesmt/medicaoRisco/list.action?controlaRiscoPor=A')
    })

    it('Inserir Medição de Risco', () => {
        cy.cadastraMedicaoRisco(medicao)
    });

})