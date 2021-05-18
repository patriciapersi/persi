describe('Funcionalidade de Cadastro de Colaborador', () => {

    const dados = {
        nome: chance.name(),
        sexo: 'Masculino',
        cpf: '06060722334',
        fone: '88888888',
        colaboradorAtivo2: chance.name(),
        colaboradorDemitido: chance.name(),
        colaborador: chance.name(),
        entrevistaDesligamento: chance.sentence({ words: 3 }),
    }

    beforeEach('', () => {
        cy
            .insereColaboradorDemitido(dados.colaboradorDemitido)
            .insereColaborador(dados.nome)
            .insereEntrevistaDesligamento(dados.entrevistaDesligamento)
            .navigate('/geral/colaborador/list.action')
    });

    it('Desligar Talento', () => {
        cy
            .desligarTalento(dados)
            .popUpMessage('Confirma desligamento?')
            .successMsg('Talento desligado com sucesso.')
        cy.contains(dados.nome).should('not.exist')
    });

    it('Cadastrar Talento', () => {
        cy
            .cadastrarTalento(dados)
        cy.contains(`Talento ${dados.nome} cadastrado com sucesso.`).should('be.visible')

    });

    it('Tentativa de criar acesso ao sistema com empregado demitido', () => {
        cy
            .criarAcessoEmpregadoDemitido(dados)
        cy.contains(`* O usuário tem referência com o talento ${dados.colaboradorDemitido}, que está desligado(a).`).should('be.visible')

    });

    it('Tentativa de criar acesso ao sistema com empregado Ativo', () => {
        cy
            .criarAcessoEmpregado(dados)

    });

    it('Responder Entrevista de Desligamento', () => {
        cy
            .pesquisar()
            .acao('Entrevista de desligamento', dados.colaboradorDemitido)
            .responderEmtrevistaDesligamento(dados)
            .infoMsg('Respostas gravadas com sucesso.')
        cy.contains(dados.colaboradorDemitido).should('be.visible')
    });

    it('Excluir Colaborador', () => {
        cy
            .acao('Excluir', dados.nome)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Não existem talentos a serem listados.')
            .successMsg('Talento excluído com sucesso.')
        cy.contains(dados.nome).should('not.exist')
    });

    it('Progressão COlaborador', () => {
        cy
            .acao('Visualizar Progressão', dados.nome)
            .cadastrarNovaSituação()
    });
});