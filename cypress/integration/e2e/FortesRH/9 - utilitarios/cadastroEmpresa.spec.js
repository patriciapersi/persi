describe('Funcionalidade Cadastros de Empresas', () => {

    const empresa = {
        companyName: chance.company({ length: 6 }),
        cnpj: '63542443',
        uf: 'CE',
        cidade: 'Fortaleza',
        email: chance.email(),
        companyName2: chance.word({ syllables: 2 }),
        companyName3: chance.word({ syllables: 2 }),
        loggedCompany: 'Empresa Padrão'
    }

    beforeEach('', () => {
        cy
            .insereEmpresa(empresa.companyName2)
            .insereEmpresaSemEstabelecimento(empresa.companyName3)
            .navigate('/geral/empresa/list.action')
    })

    it('Inserir Empresa', () => {
        cy
            .cadastrarEmpresa(empresa)
            .successMsg('Empresa cadastrada com sucesso.')
        cy.contains(empresa.companyName).should('be.visible')
    })

    it('Editar Empresa', () => {
        cy
            .acao('Editar', empresa.companyName2)
            .preencheEmpresa(empresa)
            .successMsg('Empresa atualizada com sucesso')
    })

    it('Excluir Empresa Logada', () => {
        cy
            .acao('Excluir', empresa.loggedCompany)
            .popUpMessage('Confirma exclusão?')
            .warningMsg('Não é possível excluir a empresa cujo você está logado.')
    })

    it('Excluir Empresa', () => {
        cy
            .acao('Excluir', empresa.companyName3)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Empresa excluída com sucesso.')
    })
})