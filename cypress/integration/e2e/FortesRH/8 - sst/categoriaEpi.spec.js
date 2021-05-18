describe('Funcionalidade Categoria de EPI', () => {

    const dados = {
        categoriaEpi: chance.word(),
        categoriaEpi2: chance.word(),
        nomeColaborador: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados.nomeColaborador)
            .inserirCategoriaEPI(dados.categoriaEpi2)
            .navigate('/sesmt/tipoEPI/list.action')
    })

    it('Inserção Categoria de EPI', () => {
        cy
            .cadastrarCategoriaEPI(dados)
    });

    it('Edição Categoria de EPI', () => {
        cy
            .acao('Editar', dados.categoriaEpi2)
            .clicaBotao('Gravar')
            .successMsg('Categoria atualizada com sucesso!')
    });

    it('Exclusão Categoria de EPI', () => {
        cy
            .acao('Excluir', dados.categoriaEpi2)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Tipo de EPI excluído com sucesso.')
    });
})