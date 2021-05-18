describe('Funcionalidade Cadastros de Usuários', () => {
    const usuarios = {
        usu_nome: chance.name(),
        senha: chance.word({ length: 5 }),
        colaborador_nome: chance.name(),
    }
    const usuario = {
        usu_nome: chance.name(),
        senha: chance.word({ length: 5 }),
        colaborador_nome: chance.name(),
    }

    beforeEach('', () => {
        cy
            .insereUsuario(usuarios.usu_nome)
            .navigate('/acesso/usuario/list.action')
    })

    it('Inserir Usuário Automaticamente - Sem Colaboradores Cadastrado', () => {
        cy.cadastrarUsuarioAutomatico(usuarios)
            .infoMsg('Não existe talento sem usuário.')
    })

    it('Inserir Usuário Automaticamente', () => {
        cy
            .insereColaborador(usuarios.colaborador_nome)
            .cadastrarUsuarioAutomatico(usuarios)
            .infoMsg('Usuários criados com sucesso.')
    })

    it('Inserir Usuário Automaticamente - Usuario Já Associado a Colaborador', () => {
        cy.insereUsuarioComEmpregado(usuarios.colaborador_nome)
            .cadastrarUsuarioAutomatico(usuarios)
            .infoMsg('Não existe talento sem usuário.')
    })

    it('Excluir Usuário Logado', () => {
        cy
            .acao('Excluir', Cypress.config('user_name'))
            .popUpMessage('Confirma exclusão?')
            .errorMsg('Não foi possível excluir este Usuário. Utilize o campo "Ativo" para retirar o acesso do usuário ao sistema.')
    })

    it('Excluir Usuário', () => {
        cy
            .acao('Excluir', usuarios.usu_nome)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Usuário excluído com sucesso.')
    })

    it('Inserir Usuário Já Cadastrado', () => {
        cy
            .cadastrarUsuario(usuarios)
            .warningMsg('Este login já existe.')
    })

    it('Inserir Usuário', () => {
        cy
            .cadastrarUsuario(usuario)
        cy.contains(usuario.usu_nome)
    })

    it('Validação de Empresa e Perfil do Usuário', () => {
        cy.validaEmpresaPerfilUsuario()
        cy.validaTitulo('Usuários')
    })
})