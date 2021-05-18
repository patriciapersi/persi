describe('Relacionador de Candidado e Talento', () => {
    const dados = {
        colaborador: chance.name()
    }

    beforeEach('', () => {
        cy
            .navigate('/geral/colaborador/prepareRelacionaColaboradorCandidato.action')
    });

    it('Relacionar Candidato e Colaborador', () => {
        cy
            .insereUsuarioComEmpregado(dados.colaborador)
            .inserecandidato(dados.colaborador)
            .reload()
            .relacionarCandidato()
        cy.contains('Caso a solicitação de pessoal não seja selecionada, não será possível informar que este candidato/talento foi contratado por esta solicitação.')
            .should('be.visible')
    })

    it('Relacionar Candidato e Colaborador - Colaborador e Candidato inexistente', () => {
        cy
            .infoMsg('Não existem talentos para relacionar com candidatos de mesmo CPF.')

    })
})