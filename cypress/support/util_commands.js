Cypress.Commands.add('acao', (acao, text) => {
    cy.get(`td:contains("${text}")`).parent().find(`i[title="${acao}"]`).click()
})

Cypress.Commands.add('popUpMessage', (text) => {
    cy.get('#popup_message').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('#popup_ok').should('be.enabled').and('be.visible').click()
        } else {
            console.log('erro')
        }
    })
    cy.get('#popup_message').should('not.exist')
})

Cypress.Commands.add('clicaBotaoEntendi', () => {
    switch (cy.get('.done').click({ multiple: true, force: true })) {
        case 0:
            cy.get('.done').should('be.visible')
            break;
    }
    cy.get('.done').should('not.exist')
})

Cypress.Commands.add('warningMsgExterno', (text) => {
    cy.get('#warnings').should('be.visible').and('contain', text)
})

Cypress.Commands.add('welcomeExterno', (text) => {
    cy.get('#topDiv').should('be.visible').and('contain.text', text)
})

Cypress.Commands.add('errorMessageLogin', (text) => {
    cy.get('.txtErro').should('contain', text).and('be.visible')
})

Cypress.Commands.add('successMsg', (text) => {
    cy.get('#successMsg').should('include.text', text).and('be.visible')
})

Cypress.Commands.add('warningMsg', (text) => {
    cy.get('#warningMsg').should('include.text', text).and('be.visible')
})

Cypress.Commands.add('infoMsg', (text) => {
    cy.get('#infoMsg').should('include.text', text).and('be.visible')
})

Cypress.Commands.add('errorMsg', (text) => {
    cy.get('#errorMsg').should('include.text', text).and('be.visible')
})

Cypress.Commands.add('clicaBotaoContinuar', () => {
    cy
        .get(':nth-child(1) > .ui-button-text').should('exist').click()
})

Cypress.Commands.add('dialogMessageMesmoCPF', (text) => {
    cy.get('#talentoMesmoCpfDialog').should('include.text', text)
    cy.get(':nth-child(1) > .ui-button-text').click()
})

Cypress.Commands.add('dialogMessage', (text) => {
    cy.get('#ui-dialog-title-parentesDialog').should('contain', text)
    cy.contains('Fechar').click()
})

Cypress.Commands.add('confirmaContratacao', (text) => {
    cy.get('#ui-dialog-title-contrataDialog').should('contain', text)
    cy.contains('Confirmar').click()
})

Cypress.Commands.add('validaHomonimo', (text) => {
    cy.get('#homonimos').should('include.text', text)
})

Cypress.Commands.add('validaTitulo', (text) => {
    cy.get('#waDivTitulo').should('include.text', text).and('be.visible')
})

Cypress.Commands.add('validaItemNaGrade', (item) => {
    cy.get('.odd > :nth-child(2)').should('contain', item);
})

Cypress.Commands.add('confirmarDialogMessage', (text) => {
    if (text == null) {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', 'Confirmar').click()
    } else {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', text).click()
    }
})

Cypress.Commands.add('validaMensagem', (text) => {
    cy.get('#popup_message').should('contain', text)
    cy.get('#popup_ok').click()
})