
Cypress.Commands.add("navigate", (url) => {
    cy
        .visit(url)
        .clicaBotaoContinuar()
        .clicaBotaoEntendi()
})

Cypress.Commands.add("exec_sql", (...queries) => {
    return cy.task('query', queries)
})

Cypress.Commands.add("alteraEmpresa", (company) => {
    cy.exec_sql("select * from empresa where nome = '" + company + "'").then(({ rows }) => rows[0].id).then(empresaId => {
        cy.visit('index.action?empresaId=' + empresaId)
    });
})

Cypress.Commands.add('clearcookies', () => {
    if (Cypress.browser.name === 'firefox') {
        cy.getCookies().then((cookies) => cookies.forEach(cookie => cy.clearCookie(cookie.name)));
    }
})