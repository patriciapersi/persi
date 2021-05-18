describe('Alteração de Senha de Usuário', () => {
    const dados = {
        nomeColaborador: chance.name(),
    }

    beforeEach('', () => {
        cy.insereUsuarioComEmpregado(dados.nomeColaborador)
        cy.visit('/logout')
    })

    it('Alterar Senha de Usuario não associado a empregado', () => {
        cy.login('SOS', '1234')
        cy.navigate('/acesso/usuario/prepareUpdateSenhaUsuario.action')
        cy.warningMsg('Sua conta de usuário não está vinculada à um talento.')
    })


    it('Alterar Senha com sucesso', () => {
        cy
            .login(dados.nomeColaborador, '1234')
            .navigate('/acesso/usuario/prepareUpdateSenhaUsuario.action')
            .alterarSenhaUsuario('1234', '1234', '1234')
            .popUpMessage('Sua senha foi alterada com sucesso.')
    })

    it('Alterar Senha sem sucesso - Senha Atual incorreta', () => {
        cy
            .login(dados.nomeColaborador, '1234')
            .navigate('/acesso/usuario/prepareUpdateSenhaUsuario.action')
            .alterarSenhaUsuario('12534', '1234', '1234')
            .popUpMessage('A senha informada não confere com a senha do seu login.')
    })

    it('Alterar Senha sem sucesso - Confirmação de Senha incorreta', () => {
        cy
            .login(dados.nomeColaborador, '1234')
            .navigate('/acesso/usuario/prepareUpdateSenhaUsuario.action')
            .alterarSenhaUsuario('1234', '1234', '12434')
            .popUpMessage('A senha não foi confirmada corretamente.')
    })

    it('Alterar Senha de Usuário - Valida Campos Vazios', () => {
        cy
            .login(dados.nomeColaborador, '1234')
            .navigate('/acesso/usuario/prepareUpdateSenhaUsuario.action')
            .alterarSenhaUsuario('', '', '')
            .popUpMessage('Preencha os campos indicados.')
    })
})