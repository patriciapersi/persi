describe('Funcionalidade Categoria de EPI', () => {

    const epi = {
        nome: chance.word(),
        nomeColaborador: chance.name(),
        quantidade1: '2',
        quantidade: '50'
    }

    beforeEach('', () => {
        cy
            .insereColaborador(epi.nomeColaborador)
            .inserirEpi(epi)
            .inserirSolicitacaoEpi(epi)
            .navigate('/sesmt/solicitacaoEpi/list.action')
    })

    it('Solicitar EPI', () => {
        cy
            .solicitarEpi(epi)
        cy.contains(epi.nomeColaborador)
            .should('be.visible')
    });

    it('Entregar EPI Quantidade Superior', () => {
        cy
            .entregarEpi(epi, epi.quantidade)
            .warningMsg('O total de itens entregues não pode ser superior à quantidade solicitada')
    });

    it('Entregar EPI', () => {
        cy
            .entregarEpi(epi, epi.quantidade1)
    });
})