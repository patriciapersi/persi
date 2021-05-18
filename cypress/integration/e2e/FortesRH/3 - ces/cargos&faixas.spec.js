describe('Cargos e Faixa', () => {
    const cargo = {
        cargo_nome: chance.profession(),
        cargo_nome2: chance.profession(),
        cargo_nome3: chance.profession(),
        colaborador_nome: chance.name(),
        faixa: chance.word({ length: 1 }),
        cbo: '252510',
        valor: chance.integer({ min: 2000, max: 3500 })
    }

    beforeEach('', () => {
        cy
            .insereCargo(cargo.cargo_nome)
            .insereColaboradorComCompetencias(cargo.colaborador_nome)
            .navigate('/cargosalario/cargo/list.action')
    });

    it('Inserir Cargos', () => {
        cy
            .cadastrarCargo(cargo)
            .successMsg('Faixa gravada com sucesso.')
    });

    it('Excluir Cargos', () => {
        cy
            .excluir(cargo.cargo_nome)
            .popUpMessage('Confirma exclusão?')
            .successMsg('Cargo excluído com sucesso.')
    });

    it('Excluir Cargos - Sem sucesso', () => {
        cy
            .excluir('Encarregado Departamento Pessoal')
            .popUpMessage('Confirma exclusão?')
            .warningMsg('Não foi possível excluir este cargo.')
    });
});