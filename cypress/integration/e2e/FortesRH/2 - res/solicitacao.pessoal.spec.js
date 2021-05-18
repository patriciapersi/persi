describe('Solicitação de Pessoal', () => {
    const solicitacao = {
        candidato_name: chance.name(),
        candidato_externo: chance.name(),
        descricao: chance.word(),
        horario: chance.word(),
        estabelecimento: 'Estabelecimento Padrão',
        area: 'Área Teste',
        cargo: 'Analista de Teste Junior',
        motivoSolicitacao: 'Aumento de Quadro',
        anuncio: chance.sentence({ words: 5 }),
        data: '01/03/2021',
        porEmail: 'Não',
        motivoEncerramento: chance.sentence({ words: 3 })
    }

    const solicitacaoemAnalise = {
        descricao: chance.word(),
        anuncio: chance.sentence({ words: 5 }),
        data: '01/03/2021',
        porEmail: 'Sim',
        email: chance.email(),
        status: 'Reprovada'
    }

    beforeEach('', () => {
        cy
            .insereSolicitacaoEmAnalise(solicitacaoemAnalise.descricao)
            .inserirSolicitacaoPessoal(solicitacao.descricao)
            .inserecandidato(solicitacao.candidato_name)
            .insereCandidatoExterno(solicitacao.candidato_externo)
            .navigate('/captacao/solicitacao/list.action')
    });

    it('Inserção de Solicitação de Pessoal', () => {
        cy
            .preencheSolicitacaoPessoal(solicitacao)
        cy.contains(solicitacao.descricao).should('exist')
    });

    it('Edição de Solicitação de Pessoal', () => {
        cy
            .editarSolicitacao(solicitacaoemAnalise.descricao)
            .clicaBotao('Gravar')
        cy.contains(solicitacaoemAnalise.descricao).should('exist')
    });

    it('Exclusão de Solicitação de Pessoal', () => {
        cy
            .excluirSolicitacao(solicitacao.descricao)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Solicitação excluída com sucesso')
            .infoMsg('Não existem solicitações a serem visualizadas!')
    });

    it('Exclusão de Solicitação de Pessoal com Candidato Associado', () => {
        cy
            .excluirSolicitacao(solicitacaoemAnalise.descricao)
            .popUpMessage('Confirma exclusão?')
            .warningMsg('Não é possível excluir a Solicitação, pois existem candidatos para esta.')
        cy.contains(solicitacaoemAnalise.descricao).should('exist')
    });

    it('Anexar Documentos a Solicitação de Pessoal', () => {
        cy
            .anexarDocsSolicitacaoPessoal(solicitacaoemAnalise.descricao)
        cy.contains('Documento Anexado').should('exist')
        cy
            .excluir('Documento')
            .popUpMessage('Confirma exclusão?')
            .successMsg('Documento excluído com sucesso.')
        cy.contains('Documento Anexado').should('not.exist')
    });

    it('Anunciar Solicitação de Pessoal', () => {
        cy
            .anunciarSolicitacao(solicitacao)
        cy.contains(solicitacao.descricao).should('exist')
    });

    it('Anunciar Solicitação de Pessoal por email', () => {
        cy
            .anunciarSolicitacao(solicitacaoemAnalise)
            .infoMsg('Anúncio enviado com sucesso.')
        cy.contains(solicitacaoemAnalise.descricao).should('exist')
    });

    it('Alterar Status Solicitação de Pessoal', () => {
        cy.contains('Andamento').should('exist')
        cy
            .alterarStatusSolicitacao(solicitacao)
        cy.contains('Andamento').should('not.exist')
        cy.contains('Reprovada').should('exist')
    });

    it('Suspender Solicitação de Pessoal', () => {
        cy
            .suspenderSolicitacaoPessoal(solicitacao)
        cy.contains('Suspensa').should('exist')
    });

    it('Encerrar Solicitação de Pessoal', () => {
        cy
            .encerrarSolicitacaoPessoal(solicitacao)
            .infoMsg('Não existem solicitações a serem visualizadas!')
    });

    it('Clonar Solicitação de Pessoal', () => {
        cy
            .clonarSolicitacaoPessoal(solicitacao)
        cy.contains('Em análise').should('exist')
    });

    it('Inserir Candidatos na Solicitação de Pessoal', () => {
        cy
            .inserirCandidatosSolicitacao(solicitacao)
        cy.contains(solicitacao.candidato_name).should('exist')
    });

    it('Contratar Candidatos na Solicitação de Pessoal', () => {
        cy
            .contrataCandidatoDaSolicitacao(solicitacao)
        cy.contains(`Deseja realmente contratar ${solicitacao.candidato_name} ?`).should('exist')
        cy.confirmarDialogMessage('Contratar')
        cy.contains('Inserir Talento').should('exist')
    });

    it('Inserir HIstórico de Candidato', () => {
        let etapa_seletiva = chance.word()
        cy
            .insereEtapaSeletiva(etapa_seletiva)
            .inserirCandidatosSolicitacao(solicitacao)
            .acao('Histórico', solicitacao.candidato_name)
            .inserirHistorico(etapa_seletiva)
            .successMsg('Histórico do candidato cadastrado com sucesso')
        cy.contains(solicitacao.candidato_name).should('exist')
        cy.contains(etapa_seletiva).should('exist')
    });

    it('Liberar Solicitação em Análise pelas mensagens da tela Inicial', () => {
        cy
            .visit('index.action?')
            .clicaBotaoContinuar()
        cy.contains('Existem solicitações de pessoal aguardando liberação')
            .should('exist')
            .click()
        cy.contains('Em análise')
            .should('exist')
    });

    it('Transferir Candidatos Entre Solicitações', () => {
        cy
            .transferirCandidatoDaSolicitacao(solicitacao)
    });

    it('Edição de Solicitação que não existe', () => {
        cy
            .deletaSolicitacao(solicitacaoemAnalise.descricao)
            .editarSolicitacao(solicitacaoemAnalise.descricao)
            cy.get('#warningMsg > ul > li').should('have.text', 'A solicitação com o código 1 não foi encontrada')
    });
});