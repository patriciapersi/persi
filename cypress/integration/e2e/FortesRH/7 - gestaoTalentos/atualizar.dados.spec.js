describe('Atualizar Dados de Usuario', () => {
    const usuario = {
        nome: chance.name()
    }

    it('Tentar Atualizar dados de usuario sem empregado associado', () => {
        cy
            .navigate('/geral/colaborador/prepareUpdateInfoPessoais.action')
            .warningMsg('Sua conta de usuário não está vinculada à nenhum talento')
    });

    it('Tentar Atualizar dados de usuario com empregado associado', () => {
        cy
            .insereUsuarioComEmpregado(usuario.nome)
            .loginByApi(usuario.nome, '1234')
            .navigate('/geral/colaborador/prepareUpdateInfoPessoais.action')
            .atualizarDados()
            .successMsg('Dados atualizado com sucesso.')
    });
});