describe('PDI', () => {
    const dados = {
        nome: chance.name(),
        data: '07/04/2021',
        conhecimento_nome: chance.word({ length: 10 }),
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados.nome)
            .insereConhecimento(dados.conhecimento_nome)
            .navigate('/desenvolvimento/pdi/gerenciar.action?')
    });

    it('Inserir PDI', () => {
        cy.inserePdi(dados)
    });
});