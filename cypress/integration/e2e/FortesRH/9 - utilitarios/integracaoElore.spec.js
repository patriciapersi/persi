describe('Funcionalidade Integração Elore', () => {

    context('Configuração Token', () => {

        const tokenvalido = 'eloreToken87f929d691c24a24a445a2688f3cf4ef'
        const tokeninvalido = 'eloreToken87f929d691c24a24a445a2688f3cf4ec'

        beforeEach('', () => {
            cy
                .navigate('/geral/parametrosDoSistema/prepareUpdate.action')
        });

        it('Integra com token válido', () => {
            cy
                .integraElore(tokenvalido)
                .popUpMessage('A conexão com Elore foi realizada com sucesso.')
        });

        it('Integra com token inválido', () => {
            cy
                .integraElore(tokeninvalido)
                .popUpMessage('Token Inválido.')
        });

        it('Integra com token vazio', () => {
            cy
                .integraElore()
                .popUpMessage('Preencha o campo "Token".')
        });
    });

    context('Exporta Elore', () => {
        const colaborador = {
            nome: chance.name(),
            areaMarcada: 'Não',
            selecionaColaborador: 'Não',
            status: 'Todos'
        }

        const colaborador2 = {
            nome: chance.name(),
            areaMarcada: 'Sim',
            selecionaColaborador: 'Não',
            status: 'Todos'
        }

        const colaborador3 = {
            nome: chance.name(),
            areaMarcada: 'Sim',
            selecionaColaborador: 'Sim',
            status: 'Todos'
        }

        beforeEach('', () => {
            cy
                .ativaIntegracaoElore()
                .insereColaboradorComCompetencias(colaborador.nome)
                .insereColaborador(colaborador2.nome)
                .navigate('/geral/parametrosDoSistema/prepareExportarElore.action')
        });

        it('Exportar Colaboradores sem Selecionar Área', () => {
            cy
                .exportarParaColabore(colaborador)
                .popUpMessage('Preencha os campos indicados.')
        })

        it('Exportar Colaboradores sem Selecionar Colaborador', () => {
            cy
                .exportarParaColabore(colaborador2)
                .popUpMessage('Não existem talentos selecionados')
                .infoMsg('Não existe dados para o filtro informado.')
        })

        it('Exportar Colaboradores com Colaborador Selecionado - Cadastro Incompleto', () => {
            cy
                .exportarParaColabore(colaborador3)
                .successMsg('Cadastros exportados com sucesso.')
        })
    });
})