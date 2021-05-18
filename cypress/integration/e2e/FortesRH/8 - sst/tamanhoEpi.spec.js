describe('Funcionalidade Tamanho de EPI', () => {
    const dados = {
        tamanhoEPI: chance.letter(),
        tamanhoEPI2: chance.letter(),
        nomeColaborador: chance.letter()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados.nomeColaborador)
            .inserirTamanhoEPI(dados.tamanhoEPI2)
            .navigate('/sesmt/tamanhoEPI/list.action')
    })

    it('Inserção Tamanho de EPI', () => {
        cy
            .cadastrarTamanhoEPI(dados)
    });

    it('Edição Tamanho de EPI', () => {
        cy
            .acao('Editar', dados.tamanhoEPI2)
            .clicaBotao('Gravar')
    });

    it('Exclusão Tamanho de EPI', () => {
        cy
            .acao('Excluir', dados.tamanhoEPI2)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Tamanho excluído com sucesso.')
    });
})