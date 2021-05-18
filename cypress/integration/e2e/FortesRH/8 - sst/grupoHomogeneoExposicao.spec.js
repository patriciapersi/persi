describe.skip('Funcionalidade Grupos Homogêneos de Exposição', () => {
    const ghe = {
        descricao: 'GHE',
        dataIni: '01/01/2021',
        descricaoAtividade: 'descricao',

        nomeAmbiente: chance.word(),
        nomeProfissional: chance.name()
    }

    beforeEach('', () => {
        cy
            .inserirAmbiente(ghe.nomeAmbiente)
            .inserirProfissionalSaude(ghe.nomeProfissional)
            .navigate('/sesmt/grupoHomogeneo/list.action')
    })

    it('Inserir Grupos Homogêneos de Exposição', () => {
        cy.cadastrarGrupoHomogeneoExposicao(ghe)
        cy.successMsg('Histórico do grupo homogêneo de exposição atualizado com sucesso.')
    });

})