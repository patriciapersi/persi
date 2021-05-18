describe('Cadastros de Nível de Competencia', () => {
    const nivel = {
        nome: chance.sentence({ words: 5 })
    }

    beforeEach('', () => {
        cy
            .navigate('/captacao/nivelCompetencia/list.action')
    });

    it('Inserção Nível de Competencia', () => {
        cy
            .cadastrarNivelCompetencia(nivel)
            .successMsg('Nivel de Competencia Gravado com Sucesso!')
    });
});