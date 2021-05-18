describe('Recuperação de Senha', () => {
    const user = {
        nome: chance.name(),
    }

    const mensagem = {
        usuarioSemSenha: 'Caro(a) Sr(a), não identificamos uma senha associada ao seu cpf na empresa selecionada.',
        usuarioValido: 'Sua senha foi enviada para seu E-mail.',
        usuarioInexistente: 'Caro(a) Sr(a), não identificamos um endereço de e-mail associado ao seu usuário.'
    }

    beforeEach('', () => {
        cy
            .visit('/logout.action')
    });

    it('Tentativa de recuperar senha de Colaborador com usuário sem senha', () => {
        cy
            .insereUsuarioSemSenhaComEmpregado(user.nome)
            .esqueciMinhaSenha('34425164555')
            .infoMsg(mensagem.usuarioSemSenha)
    });

    it('Tentativa de recuperar senha de Colaborador com usuário válido', () => {
        cy
            .insereUsuarioComEmpregado(user.nome)
            .esqueciMinhaSenha('06060722334')
            .infoMsg(mensagem.usuarioValido)
    });

    it('Tentativa de recuperar senha de Colaborador Inexistente', () => {
        cy
            .esqueciMinhaSenha('06060722334')
            .infoMsg(mensagem.usuarioInexistente)
    });
});