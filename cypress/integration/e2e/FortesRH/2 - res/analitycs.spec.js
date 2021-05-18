

describe('Analitycs de Recrutamento & Seleção', () => {

    const dados = {
        etapaSeletiva: chance.name(),
        DataInicial: "01/01/2000",
        DataFinal: "01/01/2021",
        CargoNome: "Analista de Teste Junior",
        QtdVagas: "10"
    }

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

    beforeEach('', () => {
        cy
            .navigate('/indicador/duracaoPreenchimentoVaga/painel.action')
    });

    it('Vagas Disponíveis', () => {
        cy
            .inserirSolicitacaoPessoal()
            .reload()
            .verificaVagasDisponíveis(dados)
    });

    it('Valida Indicadores de R&S ', () => {
        cy
            .inserirHistoricoCandidato(dados.etapaSeletiva, solicitacao.descricao, solicitacao.candidato_name)
            .verificIndicadoresRecrutamento()
        cy.contains('Nº de currículos recebidos/cadastrados: 0').should('exist')
        cy.contains('Nº de candidatos participantes de uma ou mais etapas seletivas: 1').should('exist')
        cy.contains('Nº de etapas realizadas: 1').should('exist')
        cy.contains('Índice de eficiência do processo seletivo: 100% ').should('exist')
    });
});