describe('Funcionalidade SST > Afastamentos', () => {

    const afastamento = {
        colaboradorNome: chance.name(),
        motivo: 'Atestado Clinica Geral',
        cid: 'J11',
        descricao: 'Influenza [gripe] devida a vírus não identificado',
        profissionalsaude: chance.name()
    }
    
    beforeEach('', () => {
        cy
            .insereColaborador(afastamento.colaboradorNome)
            .insereMotivoAfastamento(afastamento)
            .insereAfastamento()
            .navigate('/sesmt/colaboradorAfastamento/list.action')
    })

    it('Motivos de Afastamento', () => {
        cy.visit('/sesmt/afastamento/list.action')
        cy.get('button').contains('Continuar').click()
        cy.contains('1 registro(s) encontrado(s).').should('be.visible')

        cy.get('#btnInserir').click()
        cy.get('#descricao').type(afastamento.motivo)
        cy.get('button').contains('Gravar').click()
        cy.contains('2 registro(s) encontrado(s).').should('be.visible')

    });

    it('Inserção', () => {
        cy.get('#btnInserir').click()
        cy.validaTitulo('Inserir Afastamento')
        cy.get('#btnPesquisar').click()
        cy.get('#tipo').select(afastamento.motivo)
        cy.get('#inicio').clear().type('10/05/2021')
        cy.get('#btnGravar').click()
        cy.contains(afastamento.colaboradorNome).should('exist')
        cy.validaTitulo('Afastamentos')
    });

    it('Edição de Afastamento', () => {
        cy.log('Editando Afastamento')
        cy.get('[href="prepareUpdate.action?colaboradorAfastamento.id=1"] > .i-container > .fa').click()
        cy.validaTitulo('Editar Afastamento')
        cy.get('#update_colaboradorAfastamento_nomeProfissionalDaSaude').clear().type(afastamento.profissionalsaude)
        cy.get('#btnGravar').click()
        cy.validaTitulo('Afastamentos')
    });    

    it('Exclusão de Afastamento', () => {
        cy.log('Excluindo Afastamento')
        cy.get(':nth-child(1) > .acao > [href="#"] > .i-container > .fa').click()
        cy.get('#popup_ok').click()
        cy.contains(afastamento.colaboradorNome).should('not.exist')
        cy.validaTitulo('Afastamentos') 
    });

})