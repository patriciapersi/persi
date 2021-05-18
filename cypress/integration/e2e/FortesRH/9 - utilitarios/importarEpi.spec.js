describe('Improtação de Epis', () => {

    beforeEach('', () => {
        cy.navigate('/importacao/prepareImportarEPIs.action')
    })

    it('Importa Epi Arquivo Vazio', () => {
        const arquivoEpi = { arquivo: 'epiVazio.txt' }
        cy
            .importarEpi(arquivoEpi)
            .errorMsg('Erro ao executar a importação.')
    })

    it('Importa Epi Arquivo Inválido', () => {
        const arquivoEpi = { arquivo: 'epiInvalido.txt' }
        cy
            .importarEpi(arquivoEpi)
            .warningMsg('Não foram encontradas linhas com dados de EPI válidos. Verifique o arquivo.')
    })
})