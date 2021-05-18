describe('Cursos', () => {
    const curso = {
        nome: chance.sentence({ words: 3 }),
        nome2: chance.sentence({ words: 3 }),
        turma_nome: chance.sentence({ words: 3 }),
        custo: chance.integer({ min: 2000, max: 3500 }),
        instrutor: chance.name(),
        colaborador: chance.name()
    }

    beforeEach('', () => {
        cy
            .insereColaborador(curso.colaborador)
            .inserirCurso(curso.nome2)
            .navigate('/desenvolvimento/curso/list.action')
    });

    it('Inserir Curso', () => {
        cy
            .cadastrarCurso(curso)
        cy.contains(curso.nome).should('be.visible')

    });

    it('Inserir Turma no curso', () => {
        cy
            .cadastrarTurma(curso)
            .clicaBotao('Voltar')
            .clicaBotao('Voltar')
        cy.contains(curso.turma_nome).should('be.visible')

    });

    it('Inserir Participantes', () => {
        cy
            .inserirTurma(curso)
            .reload()
            .acao('Turmas', curso.nome)
            .acao('Talentos Inscritos', curso.turma_nome)
            .cadastrarTalentosNasTurmas()
            .infoMsg('Talento(s) incluído(s) com sucesso!')
        cy.contains(curso.colaborador).should('be.visible')

    });

    it('Editar Cadastro de Curso', () => {
        cy
            .editar(curso.nome2)
            .clicaBotao('Gravar')
        cy.contains(curso.nome2).should('be.visible')
    });

    it('Excluir Cadastro de Curso', () => {
        cy
            .excluir(curso.nome2)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Curso excluído com sucesso.')
        cy.contains(curso.nome2).should('not.exist')
    });

    it('Editar Cadastro de Turmas', () => {
        cy
            .inserirTurma(curso)
            .reload()
            .acao('Turmas', curso.nome)
            .editarCurso(curso.turma_nome)
        cy.contains(curso.turma_nome).should('be.visible')
    });

    it('Excluir Cadastro de Turmas', () => {
        cy
            .inserirTurma(curso)
            .reload()
            .acao('Turmas', curso.nome)
            .excluir(curso.turma_nome)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Turma excluída com sucesso.')
            .infoMsg('Não existem turmas para o filtro informado.')
        cy.contains(curso.turma_nome).should('not.exist')
    });

    it('Lista de Presença de Turmas', () => {
        cy
            .inserirTurma(curso)
            .reload()
            .acao('Turmas', curso.nome)
            .acao('Lista de Frequência', curso.turma_nome)
            .infoMsg('Não existe previsão de dias para esta turma.')
    });

    it('Anexos', () => {
        cy
            .acao('Anexos', curso.nome2)
            .anexar()
        cy.contains('Documento Anexado').should('be.visible')
    });

    it('Clonar', () => {
        cy
            .clonarCurso(curso)
            .successMsg('Curso clonado com sucesso.')

        cy.contains(curso.nome2 + ' (Clone)').should('be.visible')
    });
});

