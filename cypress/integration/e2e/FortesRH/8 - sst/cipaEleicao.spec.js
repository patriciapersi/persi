describe('Funcionalidade SST > Cadastros > Cipa > Eleicões', () => {

    beforeEach('', () => {
        cy.inserirEleicao()
        cy.navigate('/sesmt/eleicao/list.action')
    })
    
    const eleicao = {
        descricao: chance.sentence({ words: 3 }),
        posse: '01/06/2021',
        estabelecimento: 'Estabelecimento Padrão'
    }
    
    it('Inserir Eleição', () => {
        cy.get('#btnInserir').click()
        cy.get('#descricao').type(eleicao.descricao)
        cy.get('#posse').clear().type(eleicao.posse)
        cy.get('#estabelecimento').select(eleicao.estabelecimento)
        cy.get('#btnGravar').click()
        cy.successMsg('Eleição cadastrada com sucesso.')
    });
})


