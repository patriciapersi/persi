Cypress.Commands.add('loginByApi', (user, senha) => {
    cy.visit('/logout')
    return cy.request({
        url: `${Cypress.config("baseUrl")}` + '/login',
        method: 'post',
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        referrer: `${Cypress.config("baseUrl")}` + '/login.action',
        referrerPolicy: "no-referrer-when-downgrade",
        body: `username=${user}&password=${senha}&j_empresa=${Cypress.config('company_id')}`,
        method: "POST",
        mode: "cors",
        credentials: "include",
    }).then(() => {
        cy.visit('/index.action')
        cy.log('Logado')
    })
})

Cypress.Commands.add('login', (user, pass) => {
    cy.get('#username')
        .should('be.enabled').and('be.visible')
        .and('have.attr', 'placeholder', 'Usuário')
        .clear().type(user, { force: true })

        cy.get('#username')
        .should('not.be.null')

    cy.get('input[placeholder = "Senha"]')
        .should('be.enabled').and('be.visible')
        .clear().type(pass, { force: true }, {log: false})

    cy.get('input[placeholder = "Senha"]')
        .should('not.be.null')

    cy.get('#entrar')
        .should('be.visible')
        .click()
})

Cypress.Commands.add('validaURL', (url) => {
    cy.url().should('be.equal', `${Cypress.config("baseUrl")}` + url)
})

Cypress.Commands.add('validaParentesco', () => {
    cy.clicaBotao('Inserir')
    cy.get('#nomePai').should('be.enabled').and('be.visible').clear().type('João Paulo')
    cy.get('#profPai').focus()
})

Cypress.Commands.add('validaEmpresaLogada', (text) => {
    cy.get('#userDiv').should('include.text', text)
})

Cypress.Commands.add('validaUsuarioLogado', (user) => {
    cy.get('.nomeUsuario').should('be.visible').and('include.text', user)
})

Cypress.Commands.add("clicaBotao", (id) => {
    cy.get('#btn' + id).should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('alterarSenhaPrimeiroAcesso', (password) => {
    cy.get('#senha').clear().type(password)
    cy.get('#confNovaSenha').clear().type(password)
    cy.get('#alterarSenha').click()
})

Cypress.Commands.add('esqueciMinhaSenha', (cpf) => {
    cy.get('.linkbranco').click()
    cy.get('#cpf').should('be.enabled').clear().type(cpf)
    cy.get('#btnEnviar').click()
})

Cypress.Commands.add('cadastraEtapaSeletiva', (etapa) => {
    cy.clicaBotao('Inserir')
    cy.get('#nome').should('be.enabled').clear().type(etapa.nome)

    if (etapa.analise === 'Sim') {
        cy.get('#analiseComportamental').should('be.enabled').check()
    } else {

        cy.get('#analiseComportamental').should('be.enabled').uncheck()
    }

    cy.clicaBotao('Gravar')

})

Cypress.Commands.add('cadastraCandidato', (candidato) => {
    cy.clicaBotao('Inserir')
    cy.preencheDadosCandidato(candidato)
    cy.insereFormacao()
    cy.insereIdiomas()
    cy.insereDocumentos()
    cy.clicaBotao('Gravar')
})

Cypress.Commands.add('preencheDadosCandidato', candidato => {
    cy.get('#nome').should('be.enabled').clear().type(candidato.nome)
    cy.get('#nascimento').should('be.enabled').clear().type('14/06/2012')
    cy.get('#sexo').select(candidato.sexo)
    cy.get('#cpf').should('be.enabled').clear().type(candidato.cpf)
    cy.get('#escolaridade').select('Ensino Médio completo')
    cy.get('#cep').should('be.enabled').clear().type('60822285')
    cy.get('#num').should('be.enabled').clear().type('249')
    cy.get('#complemento').should('be.enabled').clear().type('Apto 2 Bloco C')
    cy.get('#ende').should('be.enabled').and('not.be.null')
    cy.get('#uf').should('be.enabled').select('CE')
    cy.get('#cidade').should('be.enabled').select('Fortaleza')
    cy.get('#ddd').should('be.enabled').clear().type('85')
    cy.get('#fone').should('be.enabled').clear().type(candidato.fone)

    if (candidato.senha == null) {
        cy.log('Ignora')
    } else {

        cy.get('#naturalidade').should('be.enabled').clear().type(candidato.naturalidade)
        cy.get('#senha').should('be.enabled').clear().type(candidato.senha)
        cy.get('#comfirmaSenha').should('be.enabled').clear().type(candidato.senha)
    }
})

Cypress.Commands.add('atualizarDados', () => {
    cy
        .insereFormacao()
    cy.get('#gravar').click()
})

Cypress.Commands.add('insereFormacao', () => {
    cy.get('.abaFormacaoEscolar').should('be.visible').click()
    cy.get('#inserirFormacao').should('be.enabled').click()
    cy.get('#formacaoArea').select('Administrativa')
    cy.get('#formacaoCurso').should('be.enabled').clear().type('ADS')
    cy.get('#formacaoLocal').should('be.enabled').clear().type('Unifor')
    cy.get('#formacaoTipo').should('be.enabled').select('Graduação')
    cy.get('#formacaoSituacao').should('be.enabled').select('Concluído')
    cy.get('#formacaoConclusao').should('be.enabled').clear().type('2020')
    cy.get('ul > #frmFormacao').click()
})

Cypress.Commands.add('insereIdiomas', () => {
    cy.get('#inserirIdioma').should('be.enabled').click()
    cy.get('#idiomaSelec').should('be.enabled').select('Inglês')
    cy.get('#nivelSelec').should('be.enabled').select('Avançado')
    cy.get('#gravarIdioma').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('insereDocumentos', () => {
    cy.get('#aba5 > a').click()
    cy.get('#pis').should('be.enabled').and('be.visible').clear().type('12345678919')
})

Cypress.Commands.add('alterarStatusSolicitacao', (solicitacao) => {
    cy.get('#solicitacao').find(`td:contains("${solicitacao.descricao}")`).parent().parent().parent().parent().find('.icon-awesome[title="Alterar status (Aprovada)"]').click({ force: true })
    cy.get('#statusSolicitcao').should('be.enabled').and('be.visible').select('Reprovada')
    cy.get('#dataStatus').should('be.enabled').and('be.visible').clear().type('05/10/2020')
    cy.get('#observacaoLiberador').should('be.enabled').and('be.visible').clear().type('Solicitação de Pessoal Reprovada pelo Gestor')
    cy.get('#gravarStatus').click()
})

Cypress.Commands.add('suspenderSolicitacaoPessoal', (solicitacao) => {
    cy.get('#solicitacao').find(`td:contains("${solicitacao.descricao}")`).parent().parent().parent().parent().find('.icon-awesome[title="Suspender solicitação"]').click({ force: true })
    cy.get('#obsSuspensao').should('be.enabled').and('be.visible').clear().type('Suspenso pelo Gestor')
    cy.get('#suspendeDiv').within(($form) => {
        cy.contains('Suspender Solicitação').should('exist').click()
    })


    cy.get('#labelLink').click()
    cy.get('#visualizacao').should('be.enabled').and('be.visible').select('Todas')
    cy.get('#status').should('be.enabled').and('be.visible').select('Todos')
    cy.get('#btnPesquisar').click()

})

Cypress.Commands.add('contrataCandidatoDaSolicitacao', (solicitacao) => {
    cy.inserirCandidatosSolicitacao(solicitacao)
    cy.acao('Contratar', solicitacao.candidato_name)

})

Cypress.Commands.add('encerrarSolicitacaoPessoal', (solicitacao) => {
    cy.get('#labelLink').click()
    cy.get('#descricaoBusca').type(solicitacao.descricao)
    cy.get('#btnPesquisar').click()
    cy.get('#labelLink').click()

    cy.get('#solicitacao').find(`td:contains("${solicitacao.descricao}")`).parent().parent().parent().parent().find('.icon-awesome[title="Encerrar Solicitação"]').click({ force: true })
    cy.get('#dataEncerramento').clear().type('05/10/2020')
    cy.get('#obsAprova').clear().type(solicitacao.motivoEncerramento)
    cy.get('#formDialog').within(($form) => {
        cy.get('.flat').first().should('contain', 'Encerrar Solicitação').click()
    })

})

Cypress.Commands.add('clonarSolicitacaoPessoal', (solicitacao) => {
    cy.get('#labelLink').click()
    cy.get('#descricaoBusca').type(solicitacao.descricao)
    cy.get('#btnPesquisar').click()

    cy.get('#solicitacao').find(`td:contains("${solicitacao.descricao}")`).parent().parent().parent().parent().find('.icon-awesome[title="Clonar"]').click({ force: true })
    cy.clicaBotao('Gravar')
})

Cypress.Commands.add('inserirHistoricoCandidato', (etapa_seletiva) => {
    cy.get('#btnInserir').click()
    cy.get('#fase').select(etapa_seletiva)
    cy.get('#data').type('01/02/2021')
    cy.get('#horaIni').type('0800')
    cy.get('#horaFim').type('1200')
    cy.get('#resp').type('Responsável')
    cy.get('#apto').select('Sim')
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('inserirCandidatosSolicitacao', (solicitacao) => {
    cy.get('#labelLink').click()
    cy.get('#descricaoBusca').type(solicitacao.descricao)
    cy.get('#btnPesquisar').click()
    cy.get('#labelLink').click()

    cy.get('#solicitacao').find(`td:contains("${solicitacao.descricao}")`).parent().parent().parent().parent().find('.icon-awesome[title="Candidatos da Seleção"]').click({ force: true })
    cy.get('#btnTriagem').click()
    cy.get('#flat').click()
    cy.contains(solicitacao.candidato_name).should('exist')
    cy.get('#md').click()
    cy.get('#btnInserirSelecionados').click()
})

Cypress.Commands.add('transferirCandidatoDaSolicitacao', (solicitacao) => {
    cy.get('#labelLink').click()
    cy.get('#codigoBusca').clear().should('be.enabled').and('be.visible').type('1')
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click()
    cy.get('#labelLink').click()

    cy.get('#solicitacao').find(`td:contains("Analista de QA")`).parent().parent().parent().parent().find('.icon-awesome[title="Candidatos da Seleção"]').click({ force: true })
    cy.get('#btnTransferirCandidatos').should('be.enabled').and('be.visible').click()
    cy.get('#md').click()
    cy.get('#sol > tbody > .odd > [style="width: 30px; text-align: center;"] > input').click()
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()

    cy.successMsg('Candidatos transferidos com sucesso.')
    cy.contains(solicitacao.candidato_externo).should('not.exist')

    cy.get('#btnVoltar').should('be.enabled').and('be.visible').click()
    cy.get('#labelLink').click()
    cy.get('#codigoBusca').clear().should('be.enabled').and('be.visible').type('2')
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click()

    cy.get('#solicitacao').find(`td:contains("Analista de Teste")`).parent().parent().parent().parent().find('.icon-awesome[title="Candidatos da Seleção"]').click({ force: true })
    cy.contains(solicitacao.candidato_externo).should('exist')
})

Cypress.Commands.add('anunciarSolicitacao', (solicitacao) => {
    cy.get('#labelLink').click()
    cy.get('#descricaoBusca').type(solicitacao.descricao)
    cy.get('#btnPesquisar').click()
    cy.get('#labelLink').click()

    cy.get('#solicitacao').find(`td:contains("${solicitacao.descricao}")`).parent().parent().parent().parent().find('.icon-awesome[title="Anunciar"]').click({ force: true })
    cy.get('#titulo').should('be.enabled').and('be.visible').clear().type(solicitacao.anuncio)
    cy.get('#cabecalho').should('be.enabled').and('be.visible').clear().type(solicitacao.anuncio)
    cy.get('#exibirModuloExterno').should('be.enabled').and('be.visible').select('Sim')
    cy.get('#dataPrevisaoEncerramento').should('be.enabled').and('be.visible').clear().type(solicitacao.data)

    if (solicitacao.porEmail === 'Sim') {
        cy.get('#btnEnviarPorEmail').should('be.enabled').and('be.visible').click()
        cy.get('#enviaEmail_anuncio_titulo').should('be.enabled').and('be.visible').clear().type(solicitacao.anuncio)
        cy.get('#email').should('be.enabled').and('be.visible').clear().type(solicitacao.email)
        cy.get('#btnEnviar').should('be.enabled').and('be.visible').click()
    } else {
        cy.clicaBotao('Gravar')
    }
})

Cypress.Commands.add('editar', (text) => {
    cy.acao('Editar', text)
})

Cypress.Commands.add('editarSolicitacao', (nome_Solicitação) => {
    cy
        .get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().find('.icon-awesome[title="Editar"]').click({ force: true })
        .get('#estado').select('CE')
        .get('#cidade').select('Selecione...')
})

Cypress.Commands.add('excluirSolicitacao', (solicitacao) => {
    cy.get('#labelLink').click()
    cy.get('#descricaoBusca').type(solicitacao)
    cy.get('#btnPesquisar').click()
    cy.get('#labelLink').click()
    cy.get('#solicitacao').find(`td:contains("${solicitacao}")`).parent().parent().parent().parent().find('.icon-awesome.remove').click({ force: true })
})

Cypress.Commands.add('excluir', (text) => {
    cy.acao('Excluir', text)
})

Cypress.Commands.add('excluirCandidatoLote', () => {
    cy.get('#md').check()
    cy.get('#btnExcluirSelecionados').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('anexarDocs', (colaborador) => {
    cy.acao('Documentos do Candidato', colaborador)
    cy.anexar()
})

Cypress.Commands.add('anexar', () => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#descricao').should('be.enabled').and('be.visible').type('Documento Anexado')
    cy.get('#data').should('be.enabled').and('be.visible').clear().type('29/09/2020')
    cy.get('#documento').should('be.visible').attachFile('Anexo.jpeg')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('anexarDocsSolicitacaoPessoal', (nome_Solicitação) => {
    cy.get('#labelLink').click()
    cy.get('#descricaoBusca').type(nome_Solicitação)
    cy.get('#btnPesquisar').click()
    cy.get('#labelLink').click()

    cy.get('#solicitacao').find(`td:contains("${nome_Solicitação}")`).parent().parent().parent().parent().find('.icon-awesome[title="Documentos da Solicitação de Pessoal"]').click({ force: true })
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#descricao').should('be.enabled').and('be.visible').type('Documento Anexado')
    cy.get('#data').should('be.enabled').and('be.visible').clear().type('29/09/2020')
    cy.get('#documento').should('be.visible').attachFile('Anexo.jpeg')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('preencheSolicitacaoPessoal', (solicitacao) => {
    cy
        .clicaBotao('Inserir')
        .get('#descricao').should('be.enabled').and('be.visible').clear().type(solicitacao.descricao)
        .get('#horarioComercial').should('be.enabled').and('be.visible').clear().type(solicitacao.horario)
        .get('#estabelecimento').should('be.enabled').and('be.visible').select(solicitacao.estabelecimento)
        .get('#area').should('be.enabled').and('be.visible').select(solicitacao.area)
        .get('#faixa').should('be.enabled').and('be.visible').select(solicitacao.cargo)

    if (cy.get('#popup_title').should('be.visible')) {
        cy.get('#popup_ok').click()
    } else {
        cy.log('Nothing to do')
    }
    cy
        .get('#motivoSolicitacaoId').should('be.enabled').and('be.visible').select(solicitacao.motivoSolicitacao)
        .get('#statusSolicitcao').should('be.enabled').and('be.visible').select('Aprovada')
        .clicaBotao('Gravar')
})

Cypress.Commands.add('verificaVagasDisponíveis', (dados) => {
    cy.get('#aba1').click()
    cy.contains('Não existem candidatos para essas solicitações nesse periodo.').should('exist')
    cy.get('#labelLink').click()
    cy.get('#dataDe').should('be.enabled').and('be.visible').and('be.empty').clear().type(dados.DataInicial)
    cy.get('#dataAte').should('be.enabled').and('be.visible').and('be.empty').clear().type(dados.DataFinal)
    cy.get('#checkGroupsolicitacaosCheckIds1').click()
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click({ force: true })
    cy.get('#labelLink').click()
    cy.get('#vagasDisponiveis').within(() => {
        cy.contains(dados.CargoNome).should('exist')
        cy.get('.qtdVagaCargo').should('contain.text', dados.QtdVagas)
    })
})

Cypress.Commands.add('verificIndicadoresRecrutamento', () => {
    cy.get('#aba1').click()
    cy.contains('Não existem candidatos para essas solicitações nesse periodo.').should('exist')
    cy.get('#labelLink').click()
    cy.get('#dataDe').should('be.enabled').and('be.visible').and('be.empty').clear().type('01/01/2021')
    cy.get('#dataAte').should('be.enabled').and('be.visible').and('be.empty').clear().type('31/12/2050')
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click({ force: true })
    cy.get('#labelLink').click()
})

Cypress.Commands.add('cadastraAreaFormação', (descricao) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click({ force: true })
    cy.preencheAreaFormação(descricao)
    cy.get('#labelLink').should('be.visible').click()
    cy.get('#nome').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao)
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click({ force: true })
})

Cypress.Commands.add('preencheAreaFormação', (descricao) => {
    cy.get('#nome').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click({ force: true })
})

Cypress.Commands.add('cadastrarAreaOrganizacional', (descricao) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#nome').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao.area_nome)

    if (descricao.possuiAreaMae === 'Sim') {
        cy.get('#areaMaeId').select(descricao.area_nome2)
    } else {

    }
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('cadastraCHA', (descricao) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#nome').clear().should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao)
    cy.get('#mt').should('be.visible').click()
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click({ force: true })
})

Cypress.Commands.add('editarCHA', (descricao) => {
    cy.editar(descricao)
    cy.get('#mt').should('be.visible').click()
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click({ force: true })
})

Cypress.Commands.add('cadastraIndice', (descricao) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#nome').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao.indice_nome3)
    cy.get('#dataHist_button').trigger('mouseouver').click()
    cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
    cy.get('#valor').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao.valor)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click({ force: true })
})

Cypress.Commands.add('editarIndice', (descricao) => {
    cy.editar(descricao)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click({ force: true })
})

Cypress.Commands.add('cadastrarCargo', (descricao) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#nome').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao.cargo_nome2)
    cy.get('#nomeMercado').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao.cargo_nome2)
    cy.get('#mt').click()
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
    cy.get('#nome').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao.faixa)
    cy.get('#codigoCBO').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao.cbo)


    cy.get('#data_button').trigger('mouseouver').click()
    cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()

    cy.get('#tipo').select('Por valor')
    cy.get('#valor').should('be.enabled').and('be.visible').and('be.empty').clear().type(descricao.valor)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarNivelCompetencia', (nivel) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#descricao').should('be.enabled').and('be.visible').and('be.empty').clear().type(nivel.nome)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarHistoricoNivelCompetencia', (historico) => {
    cy.get('#inserir').click()
    cy.get('#configHistoricoNivel_0').should('be.checked')
    cy.get('#peso_0').clear().type(historico.historico_peso)
    cy.get('#percentual_0').clear().type(historico.historico_percentual)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarReajuste', (reajuste) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#titulo').should('be.enabled').and('be.visible').clear().type(reajuste.nome)
    cy.get('#data_button').trigger('mouseouver').click()
    cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
    cy.get('#tipoReajuste').select('Talento')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarPesquisa', (pesquisa) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#titulo').should('be.enabled').and('be.visible').clear().type(pesquisa.nome)

    if (pesquisa.monitoramento === 'Sim') {
        cy.get('.text').should('be.visible').click()
        cy.get('.fa-heartbeat').should('be.visible')
    } else {
        cy.get('#anonima').select('Não')
    }

    cy.get('#dataInicio').should('be.enabled').and('be.visible').clear().type(pesquisa.data_inicial)
    cy.get('#dataFim').should('be.enabled').and('be.visible').clear().type(pesquisa.data_final)
    cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarPergunta', (pergunta) => {
    cy.get('.waDivFormulario > :nth-child(5) > a').should('be.visible').click()
    cy.get(':nth-child(8) > .loaded > .note-editor > .note-editing-area > .note-editable').focus().type(pergunta.perguntas)
    cy.get('#tipo').focus().type('Subjetiva')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
    cy.get('#btnAplicarNaOrdemAtual').should('be.enabled').and('be.visible').click()
    cy.get('#btnConcluir').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('responderPesquisa', (pesquisa) => {
    cy.acao('Talentos', pesquisa.nome)
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#labelLink').should('be.visible').click()
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click()
    cy.get('#btnInserirSelecionados').should('be.enabled').and('be.visible').click()

    if (pesquisa.parcial === 'Sim') {
        cy.visit('/pesquisa/colaboradorResposta/prepareResponderQuestionarioPesquisa.action?questionario.id=1&colaborador.id=1&tela=index&validarFormulario=true')
        cy.clicaBotaoContinuar()
        cy.get('#btnGravarParcialmente').should('be.enabled').and('be.visible').click()
    } else {
        cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
        cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
        cy.get('.title').should('have.text', 'Parte 1 de 9')
        cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
    }
})

Cypress.Commands.add("cadastrarAvaliacaoDesempenho", (avaliacao) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#titulo').should('be.enabled').and('be.visible').clear().type(avaliacao.Titulo)
    cy.get('#inicio').should('be.enabled').and('be.visible').clear().type(avaliacao.PeriodoInicial)
    cy.get('#fim').should('be.enabled').and('be.visible').clear().type(avaliacao.PeriodoFinal)

    if (avaliacao.ModeloAvaliacao === 'Não') {
        cy.get('#avaliarSomenteCompetencias').check()
    } else {
        cy.get('#modelo').select(avaliacao.ModeloAvaliacao)
    }

    cy.get('#permiteAutoAvaliacao').select(avaliacao.PermiteAutoavaliacao)
    cy.get('#anonima').select(avaliacao.Anonima)
    cy.get('#btnAvancar').click()

    cy.cadastrarParticipantes()

    cy.get('[style="width: 760px; margin: 0 auto;"]').within(($form) => {
        cy.get('#btnGravar').click()
    })
})

Cypress.Commands.add("excluirRespostasLote", (avaliacao) => {
    cy.get('#btnVoltar').should('be.enabled').and('be.visible').click()
    cy.get('#md').check()
    cy.get('#btnExcluirRespostas').click()
})

Cypress.Commands.add("cadastrarParticipantes", () => {
    //Inserir Avaliado
    cy.get('#inserir_Avaliado').click()
    cy.get('#btnPesquisar').click()
    cy.get('#wwctrl_colaboradorsCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').click()


    cy.get('.buttonGroup').within(($form) => {
        cy.get('#btnGravar').click()
        cy.get('#boxtitle').should('not.exist')
    })

    //Inserir Avaliador
    cy.get('#inserir_Avaliador').click()
    cy.get('#btnPesquisar').click()
    cy.get('#wwctrl_colaboradorsCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').click()

    cy.get('.buttonGroup').within(($form) => {
        cy.get('#btnGravar').click()
        cy.get('#boxtitle').should('not.exist')
    })

    cy.get('#selecionarTodosAvaliado').click()
    cy.get('#relacionar_selecionados').click()
    cy.get('.for-all').click()

})

Cypress.Commands.add("liberarPesquisaEmLote", () => {
    cy.get('#btnLiberarAv').should('be.enabled').and('be.visible').click()
    cy.get('#btnPesquisarAv').should('be.enabled').and('be.visible').click()
    cy.get('#wwctrl_avaliacoesCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').should('be.visible').click()
    cy.get('#btnLiberar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add("responderAvaliacaoDesempenho", (avaliacao) => {
    cy.get('#labelLink').should('be.visible').click()
    cy.get('#avaliador').should('be.visible').select(avaliacao.Colaborador)
    cy.get('.flat').should('be.enabled').and('be.visible').click()
    cy.acao('Responder', avaliacao.Colaborador)
    cy.get('#responderAvaliacaoDesempenho_perguntas_0__colaboradorRespostas_0__valor').select('8')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add("responderAcompanhamentoPeriosoExperiencia", (colaborador) => {
    cy.get('#btnPesquisar').should('be.visible').click()
    cy.get('#colab').should('be.visible').select(colaborador.nome + ' - 344.251.645-55')
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#avaliacaoExperiencias').should('be.visible').select(colaborador.avaliacao)
    cy.get('#insertAvaliacaoExperiencia_perguntas_0__colaboradorRespostas_0__valor').select('8')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarCurso', (curso) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#nome').should('be.enabled').and('be.visible').clear().type(curso.nome)
    cy.get('#form_curso_cargaHorariaMinutos').should('be.enabled').and('be.visible').clear().type('08:00')
    cy.get('#tipo').should('be.visible').select('Comportamental')
    cy.get('#form_curso_categoriaCurso_id').should('be.visible').select('Especialização')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarTurma', (turma) => {
    cy.acao('Turmas', turma.nome2)
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#desc').should('be.enabled').and('be.visible').clear().type(turma.turma_nome)
    cy.get('#custo').should('be.enabled').and('be.visible').clear().type(turma.custo)
    cy.get('#inst').should('be.enabled').and('be.visible').clear().type(turma.instrutor)
    cy.get('#prevIni').should('be.enabled').and('be.visible').clear().type('01/03/2021')
    cy.get('#prevFim').should('be.enabled').and('be.visible').clear().type('07/03/2021')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add("cadastrarTalentosNasTurmas", () => {
    cy.get('#btnIncluirTalentos').should('be.enabled').and('be.visible').click()
    cy.get('#btnPesquisar').should('be.enabled').and('be.visible').click()
    cy.get('#md').should('be.visible').and('be.checked')
    cy.get('#btnInserirSelecionados').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add("clonarCurso", (curso) => {
    cy.acao('Clonar', curso.nome2)
    cy.get('#mt').should('be.visible').click()
    cy.get('#btnClonar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarCategoriaDeCurso', (categoria) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.preencheDadosCategoriaDeCurso(categoria)
})

Cypress.Commands.add('preencheDadosCategoriaDeCurso', (categoria) => {
    cy.get('#nome').should('be.enabled').and('be.visible').clear().type(categoria.nome)
    cy.get('.box').should('be.visible')
    cy.get('.mascaraMesAno').should('be.enabled').and('be.visible').clear().type(categoria.mes_Ano)
    cy.get('.metas').should('be.enabled').and('be.visible').clear().type(categoria.horas)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('inserirHistoricoCategoriaDeCurso', (categoria) => {
    if (categoria.mesAno === '01/2021') {
        cy.get('.mascaraMesAno').first().should('be.enabled').and('be.visible').clear().type(categoria.mesAno)
    } else {
        cy.get('.mascaraMesAno').first().should('be.enabled').and('be.visible').clear().type(categoria.mes_Ano)
    }
    cy.get('.metas').first().should('be.enabled').and('be.visible').clear().type(categoria.horas)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('editarCurso', (text) => {
    cy.editar(text)
        .get('#formTurma_turma_realizada').select('Sim')
        .clicaBotao('Gravar')
})

Cypress.Commands.add('cadastrarEntrevistaDesligamento', (entrevista) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#titulo').should('be.enabled').and('be.visible').clear().type(entrevista.titulo)
    cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
    cy.contains('Inserir pergunta aqui').should('be.visible').click()
    cy.get('#texto').should('be.enabled').and('be.visible').clear().type(entrevista.pergunta)
    cy.get('#tipo').select(entrevista.tipo)
    cy.get('.btnGravar').should('be.enabled').and('be.visible').click()
    cy.get('#btnVoltar').should('be.enabled').and('be.visible').click()
    cy.get('#btnCancelar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarDadosFuncionaisTalento', () => {
    cy.get('#aba2 > a').click()
    cy.get('#dt_admissao').should('be.enabled').and('be.visible').clear().type('17/03/2021')
    cy.get('#estabelecimento').select('Estabelecimento Padrão')
    cy.get('#areaOrganizacional').select('Gestão de Pessoas')
    cy.get('#faixa').select('Analista Dep Pessoal Senior')
    cy.get('#tipoSalario').select('Por valor')
    cy.get('#salarioProposto').should('be.enabled').and('be.visible').clear().type('5000')
})

Cypress.Commands.add('cadastrarTalento', (talento) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.preencheDadosCandidato(talento)
    cy.get('#email').type('email@teste.com')
    cy.cadastrarDadosFuncionaisTalento()
    cy.insereFormacao()
    cy.insereIdiomas()
    cy.insereDocumentos()
    cy.contains('Gravar').click()
})

Cypress.Commands.add('pesquisar', (empregado) => {
    cy.get('#labelLink').click()
    cy.get('#situacao').should('be.visible').select('Todos')
    cy.get('#btnPesquisar').click()
})

Cypress.Commands.add('criarAcessoEmpregadoDemitido', (empregado) => {
    cy.pesquisar(empregado)
    cy.acao('Criar Acesso ao Sistema', empregado.colaboradorDemitido)
})

Cypress.Commands.add('criarAcessoEmpregado', (empregado) => {
    cy.pesquisar(empregado)
    cy.acao('Criar Acesso ao Sistema', empregado.nome)
    cy.get('#nome').should('be.enabled').and('be.visible').type(empregado.nome)
    cy.get('#senha').should('be.enabled').and('be.visible').type('1234')
    cy.get('#confNovaSenha').should('be.enabled').and('be.visible').type('1234')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('responderEmtrevistaDesligamento', (entrevista) => {
    cy.get('#entrevista').should('be.visible').select(entrevista.entrevistaDesligamento)
    cy.get('#btnAvancar').should('be.enabled').and('be.visible').click()
    cy.get('.opcaoResposta1').type('blah blah blah')
    cy.get('.btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarNovaSituação', () => {
    cy.get('#btnEditarHistoricos').should('be.enabled').and('be.visible').click()
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarCategoriaEPI', (categoria) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#nome').should('be.enabled').and('be.visible').type(categoria.categoriaEpi)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarTamanhoEPI', (tamanhoEpi) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#descricao').should('be.enabled').and('be.visible').type(tamanhoEpi.tamanhoEPI)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarMotivoSolicitacaoEpi', (dados) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#descricao').should('be.enabled').and('be.visible').type(dados.motivoSolicitacao)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarGrupoHomogeneoExposicao', (ghe) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#descricaoHomogeneo').clear().type(ghe.descricao)
    cy.get('#checkGroupambientesCheck1').check()
    cy.get('#data').clear().type(ghe.dataIni)
    cy.get('#observacao').clear().type(ghe.descricaoAtividade)
    cy.get('#checkGroupprofissionaisSSTCheck1').check()
    cy.get('#btnGravar').click()
    cy.get('#btnGravar').click()
    cy.get(':nth-child(1) > .ui-button-text')
})

Cypress.Commands.add('cadastraHistoricoGHE', () => {
    cy.get('#adicionaLinhaAgenteNocivo').click()
    cy.get('#checkGroupativPerigInsalsCheck7').check()
    cy.get(':nth-child(1) > .ui-button-text').click()
    cy.get('.fa-caret-down').click()
})

Cypress.Commands.add('cadastraMedicaoRisco', (medicao) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#data').clear().type(medicao.dataMedicao)
    cy.get('#estabelecimento').select('1')
    cy.get('#ambiente').select(medicao.nomeAmbiente)
})

Cypress.Commands.add('alterarSenhaUsuario', (senha, newSenha, confSenha) => {

    if (senha != '' || newSenha != '' || confSenha != '') {
        cy.get('#senha').should('be.enabled').and('be.visible').type(senha)
        cy.get('#novaSenha').should('be.enabled').and('be.visible').type(newSenha)
        cy.get('#confSenha').should('be.enabled').and('be.visible').type(confSenha)
        cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
    } else {
        cy.get('#btnGravar').click()
    }
})

Cypress.Commands.add('cadastrarEmpresa', (empresa) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.preencheEmpresa(empresa)
})

Cypress.Commands.add('preencheEmpresa', (empresa) => {
    cy.get('#nome').clear().should('be.enabled').and('be.visible').type(empresa.companyName)
    cy.get('#razao').should('be.enabled').and('be.visible').type(empresa.companyName)
    cy.get('#uf').select(empresa.uf)
    cy.get('#cidade').select(empresa.cidade)
    cy.get('#cnpj').should('be.enabled').and('be.visible').type(empresa.cnpj)
    cy.get('#remetente').should('be.enabled').and('be.visible').type(empresa.email)
    cy.get('#respSetorPessoal').should('be.enabled').and('be.visible').type(empresa.email)
    cy.get('#respRH').should('be.enabled').and('be.visible').type(empresa.email)
    cy.get('#formulaTurnover').select('[(Admissões + Demissões / 2) / Ativos no final do mês anterior] * 100')
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarCartao', (cartao) => {
    cy.acao('Cartões', cartao.company)
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#tipoCartao').select(cartao.Tipo)
    cy.get('#insert_cartao_ativo').select('Sim')
    if (cartao.Tipo === 'Reconhecimento') {
        cy.get('#anos').clear().type('10')
    }

    cy.get('#mensagem').clear().should('be.enabled').and('be.visible').type(cartao.Mensagem)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarGrupoAc', (grupoAc) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#descricao').clear().should('be.enabled').and('be.visible').type(grupoAc.descricao)
    cy.get('#codigo').clear().should('be.enabled').and('be.visible').type(grupoAc.codigo)
    cy.get('#acUsuario').clear().should('be.enabled').and('be.visible').type(grupoAc.usuario)
    cy.get('#acSenha').clear().should('be.enabled').and('be.visible').type(grupoAc.senha)
    cy.get('#acUrlSoap').clear().should('be.enabled').and('be.visible').type(grupoAc.soap)
    cy.get('#acUrlWdsl').clear().should('be.enabled').and('be.visible').type(grupoAc.wdsl)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarUsuarioAutomatico', (usu) => {
    cy.get('#btnCriarUsuariosAuto').should('be.enabled').and('be.visible').click()
    cy.get('#senhaPadrao').clear().should('be.enabled').and('be.visible').type(usu.senha)
    cy.get('#confirmaSenha').clear().should('be.enabled').and('be.visible').type(usu.senha)
    cy.get('#btnCriarUsuarios').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('cadastrarUsuario', (usu) => {
    cy.get('#btnInserir').should('be.enabled').and('be.visible').click()
    cy.get('#nome').clear().should('be.enabled').and('be.visible').type(usu.usu_nome)
    cy.get('#login').clear().should('be.enabled').and('be.visible').type(usu.usu_nome)
    cy.get('#senha').clear().should('be.enabled').and('be.visible').type(usu.senha)
    cy.get('#confNovaSenha').clear().should('be.enabled').and('be.visible').type(usu.senha)
    cy.get('#btnGravar').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('validaEmpresaPerfilUsuario', () => {
    cy
            .acao('Editar', 'homolog')
            .get('[style="width: 30px; text-align: center;"] > input').uncheck()
            .get('#selectPerfil_1').should('be.disabled')
            .get('[style="width: 30px; text-align: center;"] > input').check()
            .get('#selectPerfil_1').should('not.be.disabled')
            .get('#btnGravar').click()
})

Cypress.Commands.add('desligarTalento', (talento) => {
    cy.get('.fa-user-times').should('be.visible')
    cy.exec_sql("select * from colaborador where nome = '" + talento.nome + "'").then(({ rows }) => rows[0].id).then(colaboradorId => {
        cy.visit('/geral/colaborador/prepareDesliga.action?colaborador.id=' + colaboradorId + '&nomeBusca=&cpfBusc=')
    });
    cy.clicaBotaoContinuar()
    cy.contains(talento.nome).should('be.visible')
    cy.get('#data_button > .fa').trigger('mouseouver').click()
    cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
    cy.get('#motivoId').select('Justa Causa')
    cy.get('#btnDesligarColaborador').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('importarEpi', (arquivo) => {
    cy.get('#arquivo').should('be.visible').attachFile(arquivo.arquivo, { allowEmpty: true })
    cy.get('#btnImportar').click()
})

Cypress.Commands.add('cadastrarComissao', (comissao) => {
    cy.get('#btnInserir').click()
    cy.get('#dataIni').clear().type(comissao.dataIni)
    cy.get('#dataFim').clear().type(comissao.dataFim)
    cy.get('#eleicao').select(comissao.eleicao)
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('cadastrarReuniao', (comissao) => {
    cy.get('[href="prepareUpdate.action?comissao.id=1"] > .i-container > .fa').click()
    cy.get('.ativaReuniao').click()
    cy.get('#btnInserir').click()
    cy.get('#reuniaoData').clear().type(comissao.dataFim)
    cy.get('#reuniaoHorario').clear().type('10:00')
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('integraElore', (token) => {
    if (token != null) {
        cy.get('#tokenElore').clear().should('be.enabled').and('be.visible').type(token)
    }
    cy.get('#btnTestarConexao').should('be.enabled').and('be.visible').click()
})

Cypress.Commands.add('exportarParaColabore', (elore) => {
    if (elore.areaMarcada === 'Não') {
        cy.get('#btnPesquisar').click()
    } else if (elore.areaMarcada === 'Sim' && elore.selecionaColaborador === 'Não') {
        cy.get('#checkGroupareaIds1').check()
        cy.get('#btnPesquisar').click()
        cy.get('#exportarSelecionados').click()
    } else {
        cy.get('#checkGroupareaIds1').check()
        cy.get('#statusExportacao').select(elore.status)
        cy.get('#btnPesquisar').click()
        cy.get('#checkExportacao').check()
        cy.get('#exportarSelecionados').click()
    }
})

Cypress.Commands.add('relacionarCandidato', () => {
    cy.get('#relacionaAcao0').click()
})

Cypress.Commands.add('loggedIn', (user, password) => {
    cy.get('#cpfRH').clear().should('be.enabled').and('be.visible').type(user)
    cy.get('#senhaRH').clear().should('be.enabled').and('be.visible').type(password)
    cy.get('#empresa').should('not.be.null')
    cy.get('.btnEntrar').click()
})


Cypress.Commands.add('solicitarEpi', (epi) => {
    cy.contains('Inserir').click()
    cy.contains('Pesquisar').click()
    cy.get('#colaborador').select(epi.nomeColaborador + ' - 344.251.645-55')
    cy.get('#data_button > .fa').trigger('mouseouver').click()
    cy.contains('Hoje').should('be.visible').trigger('mouseouver').click()
    cy.get('#check1').check()
    cy.get('#selectQtdSolicitado_1').clear().should('be.enabled').and('be.visible').type('10')
    cy.contains('Gravar').click()
})

Cypress.Commands.add('entregarEpi', (epi, epi2) => {
    cy.acao('Entregar/Devolver', epi.nomeColaborador)
    cy.get('.odd > :nth-child(3) > a').click()
    cy.get('#dataEntrega').clear().type('06/04/2021')
    cy.get('#qtdEntregue').clear().type(epi2)
    cy.get('#epiHistoricoId').select('01/01/2021 - 123456789 - 30')
    cy.get('#btnGravar').click()
})

Cypress.Commands.add('inserePdi', (dados) => {
    cy
        .acao('Inserir novo PDI', dados.nome)
        .get('#dataPDI').clear().type(dados.data)
        .get(':nth-child(1) > .ui-button-text').click()
        .get('.title').click()
        .get('#form-competencias > #wwgrp_competenciasCheck > #wwctrl_competenciasCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').click()
        .get('[aria-labelledby="ui-dialog-title-dialog-competencias"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > :nth-child(1) > .ui-button-text').click()
        .get('[for="box-closed-1-C"] > .title > .fa').click()
        .get('.outras').click()
        .get('[aria-labelledby="ui-dialog-title-dialog-acao"] > #dialog-acao > #form-acao > #wwgrp_descricao > #wwctrl_descricao > #descricao').type('Descrição')
        .get('[aria-labelledby="ui-dialog-title-dialog-acao"] > #dialog-acao > #form-acao > #wwgrp_peso > #wwctrl_peso > #peso').type('2')
        .get('#inicio_0').clear().type(dados.data)
        .get('[aria-labelledby="ui-dialog-title-dialog-acao"] > .ui-dialog-buttonpane > .ui-dialog-buttonset > :nth-child(1) > .ui-button-text').click()
        .get('[onclick="submit(2);"]').click()
        .acao('Gerenciar', dados.data)
        .get('[onclick="submit(1);"]').click()
        .acao('Acompanhar', dados.data)
        .get('.title > .fa').click()
})

Cypress.Commands.add('reajustePorTalento', (dados) => {
    cy.get('#tabelaReajuste').select(dados.nome)
    cy.get('#wwctrl_areasCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').click()
    cy.get('#wwctrl_estabelecimentosCheck > .listCheckBoxContainer > .listCheckBoxBarra > #mt').click()
    cy.get('#valorDissidio').clear().type(dados.percentual)
    cy.get('#btnGravar').click()
    cy.successMsg('Solicitação de realinhamento gravado com sucesso.')
    cy.get('#btnAplicar').click()
})

Cypress.Commands.add('cadastrarOcorrenciaNova', (ocorrencia) => {
    cy.get('#btnPesquisar').should('be.visible').and('be.enabled').click()
    cy.cadastrarOcorrencia(ocorrencia)
})

Cypress.Commands.add('cadastrarOcorrencia', (ocorrencia) => {
    cy.get('#colab').select(ocorrencia.colaborador_nome)
    cy.get('#btnInserir').should('be.visible').and('be.enabled').click()
    cy.get('#ocorrencia').select(ocorrencia.name)
    cy.get('#dataIni').should('be.visible').and('be.enabled').clear().type(ocorrencia.data)
    cy.get('#dataFim').should('be.visible').and('be.enabled').clear().type(ocorrencia.data)
    cy.get('#btnGravar').should('be.visible').and('be.enabled').click()
})

Cypress.Commands.add('clickButton', (button) => {
    cy.get('button').contains(button).click()
})

Cypress.Commands.add('gravarIncompleto', (text) => {
    cy.clickButton('Gravar')
    cy.validaMensagem(text)
})

