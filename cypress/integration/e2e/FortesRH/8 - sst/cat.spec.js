describe('Funcionalidade SST > CAT', () => {

    const cat = {
        colaboradorNome: chance.name(),
        medicoNome: chance.name(),
        data: '01/01/2021',
        dataFutura: '01/01/2080',
        dataPassada: '01/01/2010'
    }
    
    beforeEach('', () => {
        cy
            .insereColaborador(cat.colaboradorNome)
            .insereMedico(cat.medicoNome)
            .insereCAT(cat)
            .navigate('/sesmt/cat/list.action')
    })

    it.only('Cadastrar CAT', () => {
       
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
        cy.get('#horario').should('be.enabled').clear().type(1531)
        cy.get('#horasTrabalhadasAntesAcidente').should('be.disabled')
        cy.get('#tipoAcidente').select('Típico')
        cy.get('#horario').should('be.enabled').clear().type(2359)
        cy.get('#horasTrabalhadasAntesAcidente').should('be.enabled').clear().type(9959)

        cy.get('#obito').select('Não')
        cy.get('#dataObito').should('be.disabled')

        cy.get('#comunicouPolicia').select('Não')
        cy.get('#iniciatCAT').select('Empregador')
        //cy.get('#geradorAcidenteProf').should('be.checked')//
        
        cy.get('#divSelectDialogsitGeradoraDoencaProfissional0 > .openSelectDialog').click()
        cy.get('#sitGeradoraDoencaProfissional-list > :nth-child(2) > .nome').type('200072300')
        cy.contains('200072300 - Exposição à pressão ambiente elevada.').click({force:true})
        cy.clickButton('Selecionar')

        // Local do Acidente
        cy.get('#aba2').should('have.text', 'Local do Acidente').click()
        cy.get('#tipoLocal').select('Estabelecimento do empregador no Brasil')
        cy.get('#checkEstabelecimento').should('be.checked')
        cy.get('#estabelecimento').select('Estabelecimento Padrão').should('be.visible')
        cy.get('#localAcidente').type('Pátio')
        cy.get('#cep').should('be.visible').clear().type('55812130')
        cy.get('#num').should('be.visible').clear().type(460)
        cy.get('#complemento').type('Casa')
        cy.get('#ende').click({force:true}).should('have.value', 'Rua Guaraci')
        cy.get('#uf').find(':selected').should('have.text', 'PE')
        cy.get('#cidade').find(':selected').should('have.text', 'Carpina')
        cy.get('#bairroNome').should('have.value', 'Santa Terezinha')

        // Parte Atingida
        cy.get('#aba3').should('have.text', 'Parte Atingida').click()
        cy.get('#divSelectDialogparteCorpoAtingida0 > .openSelectDialog').click()
        cy.contains('753510000').dblclick({force: true})
        cy.get('.selectLateralidade').select('Ambas').find(':selected').should('have.text', 'Ambas')

        // Agente Causador
        cy.get('#aba4').should('have.text', 'Ag. Causador').click()
        cy.get('#divSelectDialogagenteCausadorAcidenteTrabalho0 > .openSelectDialog').click()
        cy.contains('302010700 - Telhado').dblclick({force:true})

        //Atestado
        cy.get('#aba5').should('have.text', 'Atestado').click()
        cy.get('.select2-selection')
            .within(() => {
                cy.contains('Selecione...').click()
            })
        cy.contains('span', cat.medicoNome).should('be.visible').click()
        cy.get('#dataAtendimento').clear().type(cat.data)
        cy.get('#horaAtendimento').should('be.enabled').clear().type(2359)
        cy.get('#indicativoInternacao').should('be.enabled').select('Não')
        cy.get('#duracaoTratamentoEmDias').should('be.enabled').type(1)
        cy.get('#indicativoAfastamento').should('be.enabled').select('Não')
        cy.get('#cid').should('be.enabled').and('be.visible').type('S018')
            cy.contains('a', 'S018').should('be.visible').click()
            cy.contains('a', 'Ferimento na cabeça, de outras localizações').should('exist')
        cy.get('#divSelectDialogdescricaoNaturezaLesao0 > .openSelectDialog').type('702030000')
            cy.contains('702030000 - Luxação').dblclick({force:true})
        cy.clickButton('Gravar')
        cy.successMsg('Comunicado de acidente de trabalho cadastrada com sucesso.')

    });

    it('Editar CAT', () => {

        
   

        cy.acao('Editar', cat.colaboradorNome)
        cy.get('.ui-button-text').should('be.visible').click()
        cy.get('#obito').select('Sim')
        cy.get('#dataObito').should('be.enabled').clear().type(cat.dataFutura)

        // Agente Causador
        cy.get('#aba4').should('have.text', 'Ag. Causador').click()
        cy.get('#divSelectDialogagenteCausadorAcidenteTrabalho0 > .openSelectDialog').click()
        cy.contains('302010700 - Telhado').dblclick({force:true})

        cy.clickButton('Gravar')
        cy.successMsg('Comunicado de acidente de trabalho atualizado com sucesso.')
       
    })
    
    it('Excluir CAT', () => {
    
        cy
            .acao('Excluir', cat.colaboradorNome)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Comunicado de acidente de trabalho excluído com sucesso.')

    })

    it('Comunicação de obito', () => {
        
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
        
        // Comunicando óbito
        cy.clickButton('Inserir')
        cy.clickButton('Pesquisar')
        cy.get('#colaborador').select('1').should('contain', cat.colaboradorNome)

        cy.get('#tipo').select('Comunicação de Óbito')
        cy.get('#catOrigem').select('1').should('contain', cat.data)

        cy.get('#dataObito').should('be.enabled').clear().type('05/01/2021')
        cy.clickButton('Gravar')
        cy.successMsg('Comunicado de acidente de trabalho cadastrada com sucesso.')
    })

    it('Reabertura de CAT', () => {

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

        //Reabrindo a CAT
        cy.clickButton('Inserir')
        cy.clickButton('Pesquisar')
        cy.get('#colaborador').select('1').should('contain', cat.colaboradorNome)

        cy.get('#tipo').select('Reabertura')
        cy.get('#catOrigem').select('1').should('contain', cat.data)
        cy.wait(5000)
        //Precisei inserir a wait, pois o sistema faz um load na pagina logo após selecionar a cat de origem. 
        //Como não precisa inserir mais nenhum dado, apenas precisa clicar em gravar é como se fosse rapido demais. é preciso da o play no próprio cypress para o teste continuar.

        cy.clickButton('Gravar')


    })
})