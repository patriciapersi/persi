describe('Cadastros de Nível de Competencia', () => {
    const nivel = {
        nome: chance.sentence({ words: 5 }),
        historico_peso: chance.integer({ min: 50, max: 100 }),
        historico_percentual: chance.integer({ min: 1, max: 100 })
    }

    beforeEach('', () => {
        cy
            .insereNivelCompetencia(nivel.nome)
            .navigate('/captacao/nivelCompetenciaHistorico/list.action')
    });

    it('Inserção Histórico Nível de Competencia sem nível de competência cadastrado', () => {
        cy
            .exec_sql("delete from nivelcompetencia")
            .get('#inserir').click()
            .infoMsg('Não existe cadastro de competência a ser configurada.')
    });

    it('Inserção Histórico Nível de Competencia', () => {
        cy
            .cadastrarHistoricoNivelCompetencia(nivel)
            .successMsg('Histórico de níveis de competência salvo com sucesso.')
    });

    it('Inserção Histórico Nível de Competencia Mesma Data', () => {
        cy
            .cadastrarHistoricoNivelCompetencia(nivel)
            .cadastrarHistoricoNivelCompetencia(nivel)
            .warningMsg('Já existe um histórico de níveis de competência cadastrado nesta data')
    });

});