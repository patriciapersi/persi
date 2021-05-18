describe('Funcionalidade Area de Formação', () => {
    const chance = new Chance()

    const areaFormacao = {
        nome: '_' + chance.sentence({ words: 2 }),
        nome2: chance.sentence({ words: 2 })
    }

    beforeEach('', () => {
        cy
            .insereAreaFormacao(areaFormacao.nome)
            .navigate('/geral/areaFormacao/list.action')
    })


    it('Cadastro de Área de Formação', () => {
        cy.cadastraAreaFormação(areaFormacao.nome2)
        cy.contains(areaFormacao.nome2).should('exist')
        cy.contains('1 registro(s) encontrado(s).').should('exist')
    });

    it('Edição de Área de Formação', () => {
        cy
            .editar(areaFormacao.nome)
            .preencheAreaFormação(areaFormacao.nome2)
    });

    it('Excluir de Área de Formação', () => {
        cy
            .excluir(areaFormacao.nome)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Área de Formação excluída com sucesso.')
        cy.contains(areaFormacao.nome).should('not.exist')
    });
});