describe('Modelo Ent Desligamento', () => {
    const entrevista = {
        titulo: chance.sentence({ words: 3 }),
        pergunta: chance.sentence({ words: 8 }),
        tipo: "Nota"
    }

    beforeEach('', () => {
        cy
            .navigate('/pesquisa/entrevista/list.action')
    });

    it('Cadastrar Modelo de Entrevista Desligamento', () => {
        cy
            .cadastrarEntrevistaDesligamento(entrevista)
        cy.contains(entrevista.titulo)
    });
});