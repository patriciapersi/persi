describe('Gerenciamento de Candidatos', () => {
    const candidato = {
        nome: chance.name(),
        cpf: '34425164555',
        naturalidade: chance.city(),
        fone: chance.phone({ country: "br" }),
        senha: chance.word({ length: 5 }),
        sexo: 'Feminino'
    }

    const candidato2 = {
        nome: chance.name(),
        cpf: '34425164555',
        naturalidade: chance.city(),
        fone: chance.phone({ country: "br" }),
        senha: chance.word({ length: 5 }),
        sexo: 'Masculino'
    }

    beforeEach('', () => {
        cy
            .navigate('/captacao/candidato/list.action')
    });
    
    it('Inserir Candidato', () => {
        cy
            .exec_sql("update parametrosdosistema set camposcandidatoobrigatorio = 'nome,sexo,escolaridade,ende,num,cidade,uf,fone,ddd,certificadoMilitar,certMilTipo,certMilSerie'")
            .cadastraCandidato(candidato)
            .clicaBotao('Voltar')
            .validaURL('/captacao/candidato/list.action')
        cy.contains(candidato.nome).should('be.visible')
    });

    it('Inserção de Candidatos - Associar Candidato ao Colaborador Contratado', () => {
        cy
            .insereColaborador('Helena de Troia')
            .cadastraCandidato(candidato)
            .dialogMessageMesmoCPF(`Existem talentos que já foram contratados com esse CPF ${candidato.cpf}`)
            .successMsg('Operação efetuada com sucesso')
    });

    it('Inserção de Candidatos - mesmo CPF empregado demitido', () => {
        cy
            .insereColaboradorDemitido('Helena de Troia')
            .cadastraCandidato(candidato)
            .dialogMessageMesmoCPF(`Existem talentos que já foram contratados com esse CPF ${candidato.cpf}`)
            .successMsg('Operação efetuada com sucesso')
    });

    it('Valida Parentesco', () => {
        cy
            .insereColaborador('Helena de Troia')
            .exec_sql("update empresa set verificaparentesco = 'T'")
            .validaParentesco()
            .dialogMessage('Verificação de Parentesco')
    });

    it('Valida Obrigatoriedade do preenchimento do Certificado Militar para sexo Masculino', () => {
        cy
            .exec_sql("update parametrosdosistema set camposcandidatoobrigatorio = 'nome,sexo,escolaridade,ende,num,cidade,uf,fone,ddd,certificadoMilitar,certMilTipo,certMilSerie'")
            .cadastraCandidato(candidato2)
            .popUpMessage('Preencha os campos indicados:Número, Tipo, Série')
    });

    it('Valida Homonimos', () => {
        cy
            .inserecandidato(candidato.nome)
            .clicaBotao('Inserir')
            .preencheDadosCandidato(candidato)
            .validaHomonimo(candidato.nome)
    });

    it('Edição Cadastro de Candidatos', () => {
        cy
            .inserecandidato(candidato.nome)
            .reload()
            .editar(candidato.nome)
            .insereFormacao()
            .clicaBotao('Gravar')
        cy.contains(candidato.nome).should('be.visible')
    });

    it('Excluir Cadastro de Candidatos', () => {
        cy
            .inserecandidato(candidato.nome)
            .reload()
            .excluir(candidato.nome)
            .popUpMessage('Deseja realmente excluir o candidato ' + candidato.nome)
            .successMsg('Candidato excluído com sucesso.')
        cy.contains(candidato.nome).should('not.exist')
    });

    it('Exclusão de Cadastro de Candidatos em Lote', () => {
        cy
            .inserecandidato(candidato.nome)
            .inserecandidato(candidato.nome)
            .inserecandidato(candidato.nome)
            .inserecandidato(candidato.nome)
            .inserecandidato(candidato.nome)
            .reload()
            .excluirCandidatoLote()
            .popUpMessage('Deseja realmente excluir os candidatos?')
            .infoMsg('Não existem candidatos a serem listados')
    });

    it('Anexar Documentos', () => {
        cy
            .inserecandidato(candidato.nome)
            .reload()
            .anexarDocs(candidato.nome)
        cy.contains('Documento Anexado').should('be.visible')
    });

    it('Contratar Candidato', () => {
        cy
            .inserecandidato(candidato.nome)
            .reload()
            .acao('Contratar Candidato', candidato.nome)
            .confirmaContratacao('Contratar candidato')
            .validaTitulo('Inserir Talento')
    });

});