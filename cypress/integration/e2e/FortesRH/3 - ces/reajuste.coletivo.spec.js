describe('Reajustes', () => {

    context('Por Talento', () => {

        const dados = {
            nome: chance.word(),
            percentual: chance.integer({ min: 10, max: 30 }),
            colaborador: chance.name()
        }
    
        beforeEach('', () => {
            cy
                .insereReajustePorColaborador(dados.nome, false)
                .insereColaborador(dados.colaborador)
                .navigate('/cargosalario/reajusteColaborador/prepareDissidio.action')
        });
    
        it('Por Talento', () => {
            cy
            .reajustePorTalento(dados)
            .popUpMessage('Deseja realmente aplicar o reajuste?')
            .successMsg('Reajuste aplicado com sucesso.')
        });
    });
});