describe('Categoria de Cursos', () => {
    const categoria = {
        curso_nome: chance.sentence({ words: 3 }),
        nome: chance.sentence({ words: 3 }),
        mes_Ano: '08/2020',
        horas: '03:00'
    }

    const newcategoria = {
        nome: chance.sentence({ words: 3 }),
        mesAno: '01/2021',
        horas: '03:00'
    }


    beforeEach('', () => {
        cy
            .inserirCurso(categoria.curso_nome)
            .log('CURSO INSERIDO')
            .inserirCategoriaCurso(newcategoria.nome)
            .navigate('/desenvolvimento/categoriaCurso/list.action')
    });

    it('Inserir Categoria de Cursos', () => {
        cy
            .cadastrarCategoriaDeCurso(categoria)
        cy.contains(categoria.nome).should('be.visible')

    });

    it('Inserir Meta Categoria de Cursos', () => {
        cy
            .editar('Especialização')
            .inserirHistoricoCategoriaDeCurso(categoria)

    });

    it('Inserir Meta Repetida Categoria de Cursos', () => {
        cy
        .log('Teste')
            .editar(newcategoria.nome)
            .inserirHistoricoCategoriaDeCurso(newcategoria)
            .popUpMessage('Não é permitido inserir datas repetidas.')
    });

    it('Editar Categoria de Cursos', () => {
        cy
            .editar('Especialização')
            .preencheDadosCategoriaDeCurso(categoria)
        cy.contains(categoria.nome).should('be.visible')
        cy.contains('Especialização').should('not.exist')

    });

    it('Excluir Categoria de Cursos', () => {
        cy
            .excluir(newcategoria.nome)
            .popUpMessage('Confirma exclusão?')
            .infoMsg('Categoria do curso excluída com sucesso.')
        cy.contains(newcategoria.nome).should('not.exist')

    });

    it('Excluir Categoria de Cursos Associado a Curso', () => {
        cy
            .excluir('Especialização')
        cy.contains('Existem cursos se referenciando a categoria de curso "Especialização".').should('be.visible')
        cy.contains('Remover categoria curso e vínculo com cursos').should('be.visible').click()
            .infoMsg('Categoria do curso excluída com sucesso.')
        cy.contains('Especialização').should('not.exist')
    });
});

