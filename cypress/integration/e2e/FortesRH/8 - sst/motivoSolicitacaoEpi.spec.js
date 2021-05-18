describe('Funcionalidade Motivo Solicitação EPI', () => {

    const dados = {
        motivoSolicitacao: chance.word(),
        motivoSolicitacao2: chance.word(),
        nomeColaborador: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(dados.nomeColaborador)
            .inserirMotivoSolicitacaoEPI(dados.motivoSolicitacao2)
            .navigate('/sesmt/motivoSolicitacaoEpi/list.action')
    })

    it('Inserção Motivo de Solicitação de EPI', () => {
        cy
            .cadastrarMotivoSolicitacaoEpi(dados)
            .successMsg('Motivo da solicitação do EPI cadastrado com sucesso.')
    });

    it('Edição Motivo de Solicitação de EPI', () => {
        cy
            .acao('Editar', dados.motivoSolicitacao2)
            .clicaBotao('Gravar')
            .successMsg('Motivo da solicitação do EPI atualizado com sucesso.')
        cy.get('.odd > :nth-child(2)').contains(dados.motivoSolicitacao2).should('be.visible')
    });

    it('Exclusão Motivo de Solicitação de EPI', () => {
        cy
            .acao('Excluir', dados.motivoSolicitacao2)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Motivo da solicitação do EPI excluído com sucesso.')
        cy.contains(dados.motivoSolicitacao2).should('not.exist')
    });
})