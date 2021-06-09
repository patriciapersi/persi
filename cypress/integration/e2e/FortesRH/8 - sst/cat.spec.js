describe('Funcionalidade SST > CAT', () => {

    const cat = {
        colaboradorNome: chance.name(),
        data: '01/01/2021',
        dataFutura: '01/01/2080',
        dataPassada: '01/01/2010'
    }
    
    beforeEach('', () => {
        cy
            .insereColaborador(cat.colaboradorNome)
            .navigate('/sesmt/cat/list.action')
    })

    it('Cadastrar CAT', () => {
        cy.clickButton('Inserir')
        cy.clickButton('Pesquisar')
        cy.get('#colaborador').select('1').should('contain', cat.colaboradorNome)

        // Dados do Acidente
        cy.get('#tipo').select('Inicial').should('be.enabled')
        cy.get('#data').clear().type(cat.data)

        cy.get('#tipoAcidente').select('Doença')
        cy.get('#horario').should('be.disabled')
        cy.get('#horasTrabalhadasAntesAcidente').should('be.disabled')
        cy.get('#tipoAcidente').select('Trajeto')
        cy.get('#horario').should('be.disabled')
        cy.get('#horasTrabalhadasAntesAcidente').should('be.disabled')
        cy.get('#tipoAcidente').select('Típico')
        cy.get('#horario').should('be.enabled').clear().type(2359)
        cy.get('#horasTrabalhadasAntesAcidente').should('be.enabled').clear().type(9959)

        cy.get('#obito').select('Não')
        cy.get('#dataObito').should('be.disabled')

        cy.get('#comunicouPolicia').select('Não')
        cy.get('#iniciatCAT').select('Empregador')
        cy.get('#geradorAcidenteProf').should('be.checked')
        
        cy.get('#divSelectDialogsituacaoGeradoraDoencaProfissionalGeradora0 > .openSelectDialog').click()
        cy.get('#formSelectDialogsituacaoGeradoraDoencaProfissionalGeradora > .box > .box-search > .search').type('200072300')
        cy.contains('200072300 - Exposição à pressão ambiente elevada.').click({force:true})
        cy.clickButton('Selecionar')

        // Local do Acidente
        cy.get('#aba2').should('have.text', 'Local do Acidente').click()

        cy.get('#tipoLocal').select('Estabelecimento do empregador no Brasil')
        cy.get('#checkEstabelecimento').should('be.checked')
        cy.get('#estabelecimento').select('Estabelecimento Padrão').should('be.visible')
        cy.get('#localAcidente').type('Pátio')
        cy.get('#cep').clear().type('55812130')
        cy.get('#num').clear().type(460)
        cy.get('#complemento').type('Casa')
        cy.get('#ende').should('have.value', 'Rua Guaraci')
        cy.get('#uf').find(':selected').should('have.text', 'PE')
        cy.get('#cidade').find(':selected').should('have.text', 'Carpina')
        cy.get('#bairroNome').should('have.value', 'Santa Terezinha')

        // Parte Atingida
        cy.get('#aba3').should('have.text', 'Parte Atingida').click()
        cy.get('#divSelectDialogparteCorpoAtingida0 > .openSelectDialog').click()
        cy.contains('753510000').dblclick({force: true})
        cy.get('.selectLateralidade').select('Ambas').find(':selected').should('have.text', 'Ambas')

        // Agente Causador
        cy.get('#aba4').should('have.text', 'Agente Causador').click()
        cy.get('#divSelectDialogagenteCausadorAcidenteTrabalho0 > .openSelectDialog').click()
        cy.contains('302010700 - Telhado').dblclick({force:true})

        cy.clickButton('Gravar')
        cy.successMsg('Comunicado de acidente de trabalho cadastrada com sucesso.')

    });

    it.only('Erros ao cadastrar CAT', () => {

        cy.clickButton('Inserir')
        cy.clickButton('Pesquisar')
        cy.get('#colaborador').select('1').should('contain', cat.colaboradorNome)

        // Dados do Acidente
        cy.get('#tipo').select('Inicial').should('be.enabled')
        cy.get('#tipo').contains('Reabertura').should('be.disabled')
        cy.get('#tipo').contains('Comunicação de Óbito').should('be.disabled')
        cy.get('#catOrigem').should('be.disabled')

        cy.gravarIncompleto('Preencha os campos indicados:Acidente de Trabalho (Tabela 14) , Situação Geradora de Doença Profissional (Tabela 15) , Situação Geradora de Doença Profissional (Tabela 15) , Data do acidente  , Tipo de Acidente de Trabalho , Houve óbito? , Houve comunicação à autoridade policial? , A CAT foi emitida por , Tipo de local do acidente , Partes do Corpo Atingida (Tabela 13) ')

        cy.get('#data').clear().type(cat.dataFutura)
        cy.gravarIncompleto('Não é permitido inserir a data do acidente futura.')
        cy.get('#data').clear().type(cat.dataPassada)
        cy.gravarIncompleto('Não é permitido inserir uma data inferior a data de admissão do colaborador. Data de Admissão: 01/01/2020')
        cy.get('#data').clear().type(cat.data)

        cy.get('#tipoAcidente').select('Típico')
        cy.get('#horario').should('be.enabled').clear().type(2400)
        cy.get('#horasTrabalhadasAntesAcidente').should('be.enabled').clear().type(9960)

        cy.get('#obito').select('Sim')
        cy.get('#dataObito').should('be.enabled').clear().type(cat.dataPassada).tab()
        cy.validaMensagem('Não é possível inserir a data de óbito inferior a data da CAT. Data da CAT: 01/01/2021')
        cy.get('#dataObito').should('be.enabled').clear().type(cat.data)

        cy.get('#comunicouPolicia').select('Não')
        cy.get('#iniciatCAT').select('Empregador')
        cy.get('#geradorAcidenteProf').should('be.checked')
        cy.get('#geradorAcidenteTrab').should('not.be.checked').check().should('be.checked')
        cy.get('#divSelectDialogsituacaoGeradoraAcidenteTrabalho0 > .openSelectDialog').click()
        cy.contains('200012600').click({force: true})
        cy.clickButton('Selecionar')
        cy.gravarIncompleto('Preencha os campos indicados:Acidente de Trabalho (Tabela 14) , Situação Geradora de Doença Profissional (Tabela 15) , Tipo de local do acidente , Partes do Corpo Atingida (Tabela 13)')

        // Local do Acidente
        cy.get('#aba2').should('have.text', 'Local do Acidente').click()
        cy.get('#tipoLocal').select('Estabelecimento do empregador no Exterior')
        cy.get('#pais').should('be.visible').select('Canada').find(':selected').should('have.text', 'Canada')
        cy.get('#codigoEnderecamentoPostal').type('49216123098')
        cy.get('#ende').type('Baker Street')
        cy.get('#num').clear().type('221B')
        cy.get('#cep').should('be.disabled')
        cy.get('#uf').should('be.disabled')
        cy.get('#cidade').should('be.disabled')
        cy.gravarIncompleto('Preencha os campos indicados:Acidente de Trabalho (Tabela 14) , Situação Geradora de Doença Profissional (Tabela 15) , Partes do Corpo Atingida (Tabela 13)')

        // Parte Atingida
        cy.get('#aba3').should('have.text', 'Parte Atingida').click()
        cy.get('#divSelectDialogparteCorpoAtingida0 > .openSelectDialog').click()
        cy.contains('753510000').dblclick({force: true})
        cy.get('.selectLateralidade').select('Direita').find(':selected').should('have.text', 'Direita')
        cy.gravarIncompleto('Campos inválidos.') //Mensagem deve informar que falta preencher Agente Causador

        // Agente Causador
        cy.get('#aba4').should('have.text', 'Agente Causador').click()
        cy.get('#divSelectDialogagenteCausadorAcidenteTrabalho0 > .openSelectDialog').click()
        cy.contains('302010700 - Telhado').dblclick({force:true})
        cy.gravarIncompleto('Campos inválidos.')

        // Dados do Acidente
        cy.get('#aba1').should('have.text', 'Dados do Acidente').click()
        cy.get('#horario').should('have.css', 'background-color', 'rgb(255, 99, 71)').clear().type(2300)
        cy.gravarIncompleto('Campos inválidos.')
        cy.get('#horario').should('have.css', 'background-color', 'rgb(255, 255, 255)').clear().type(2400)

        cy.get('#horasTrabalhadasAntesAcidente').should('have.css', 'background-color', 'rgb(255, 99, 71)').clear().type(9959)
        cy.gravarIncompleto('Campos inválidos.')
        cy.get('#horasTrabalhadasAntesAcidente').should('have.css', 'background-color', 'rgb(255, 255, 255)').clear().type(9960)

        cy.gravarIncompleto('Campos inválidos.')
        cy.get('#horario').should('have.css', 'background-color', 'rgb(255, 99, 71)')
        cy.get('#horasTrabalhadasAntesAcidente').should('have.css', 'background-color', 'rgb(255, 99, 71)')        
    });

})