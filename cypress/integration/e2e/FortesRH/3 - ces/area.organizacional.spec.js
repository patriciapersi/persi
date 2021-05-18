describe('Área Organizacional', () => {
    const areaOrganizacional = {
        area_nome: chance.name(),
        area_nome2: chance.name(),
        colaboradorNome: chance.name()
    }
    const areaOrg = {
        area_nome: chance.name(),
        area_nome2: chance.name(),
        area_nome3: 'Gestão de Pessoas',
        possuiAreaMae: 'Sim'
    }

    beforeEach('', () => {
        cy
            .inserirAreaOrganizacional(areaOrganizacional.area_nome2)
            .inserirSolicitacaoPessoal()
            .insereColaborador(areaOrganizacional.colaboradorNome)
            .navigate('/geral/areaOrganizacional/list.action')

    });

    it('Inserção de Area Organizacional', () => {
        cy

            .cadastrarAreaOrganizacional(areaOrganizacional)
            .successMsg('Área organizacional inserida com sucesso')
        cy.contains(areaOrganizacional.area_nome).should('exist')
    });

    it('Inserção de Area Organizacional - Com Area Mãe', () => {
        cy
            .inserirAreaOrganizacional(areaOrg.area_nome2)
            .cadastrarAreaOrganizacional(areaOrg)
            .successMsg('Área organizacional inserida com sucesso')
        cy.contains(areaOrg.area_nome2 + ' > ' + areaOrg.area_nome).should('exist')
    });

    it('Edição de Area Organizacional', () => {
        cy
            .editar(areaOrganizacional.area_nome2)
            .clicaBotao('Gravar')
            .successMsg('Área organizacional atualizada com sucesso')
        cy.contains(areaOrganizacional.area_nome2).should('exist')
    });

    it('Exclusão de Area Organizacional', () => {
        cy
            .excluir(areaOrganizacional.area_nome2)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Área organizacional excluída com sucesso.')
        cy.contains(areaOrg.area_nome2).should('not.exist')
    });

    it('Exclusão de Area Organizacional', () => {
        cy
            .excluir('Gestao de Pessoas')
            .popUpMessage('Confirma exclusão?')
            .warningMsg('Não foi possível excluir a Área Organizacional.')
        cy.contains('Gestao de Pessoas').should('exist')
    })
});