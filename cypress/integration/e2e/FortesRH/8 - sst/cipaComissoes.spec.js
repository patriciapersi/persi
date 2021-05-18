describe('Funcionalidade SST > Cadastros > Cipa > Comissões', () => {

    const comissao = {
        dataIni: '01/01/2021',
        dataFim: '31/12/2021',
        eleicao: '31/12/2021 - Eleicao CIPA (Estabelecimento Padrão)'

    }

    beforeEach('', () => {
        cy
            .inserirEleicao()
            .inserirComissao()
            .navigate('/sesmt/comissao/list.action')            
    })
   

    it('Inserir Comissão', () => {
        cy.cadastrarComissao(comissao)
        cy.successMsg('Comissão cadastrada com sucesso')
        
    });

    it('Inserir Reunião', () => {
        cy.cadastrarReuniao(comissao)
        cy.successMsg('Reunião cadastrada com sucesso')
    });

})