describe('Funcionalidade Grupo AC', () => {
    const grupoAc = {
        descricao: chance.word(),
        code: "001",
        codigo: "002",
        usuario: "ADMIN",
        senha: "1234",
        soap: "http://localhost:1024/soap/IAcPessoal",
        wdsl: "http://localhost:1024/wsdl/IAcPessoal"
    }

    const grupoAc1 = {
        descricao: chance.word(),
        codigo: "009",
        usuario: "ADMIN",
        senha: "1234",
        soap: "http://localhost:1024/soap/IAcPessoal",
        wdsl: "http://localhost:1024/wsdl/IAcPessoal"
    }

    beforeEach('', () => {
        cy
            .insereGrupoAC(grupoAc)
            .navigate('/geral/grupoAC/list.action')
    })

    it('Inserir Grupo AC - Código já cadastrado', () => {
        cy
            .cadastrarGrupoAc(grupoAc)
            .errorMsg("Não é permitido cadastrar Grupo com o mesmo código.")
    })

    it('Inserir Grupo AC', () => {
        cy
            .cadastrarGrupoAc(grupoAc1)
        cy.contains(grupoAc1.descricao).should('exist')
    })

    it('Editar Grupo AC', () => {
        cy
            .acao('Editar', grupoAc.descricao)
            .clicaBotao('Gravar')
        cy.contains(grupoAc.descricao).should('exist')
    })

    it('Excluir Grupo AC', () => {
        cy
            .acao('Excluir', grupoAc.descricao)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Grupo AC excluído com sucesso.')
            cy.contains(grupoAc.descricao).should('not.exist')
    })

    it('Excluir Grupo AC - associado ao cadastroo de empresa', () => {
        cy
            .excluir(grupoAc.code)
            .popUpMessage('Confirma exclusão?')
            .errorMsg('Não foi possível excluir este Grupo AC.')
        cy.contains(grupoAc.code).should('exist')
    })
})