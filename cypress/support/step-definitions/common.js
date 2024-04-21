import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';
import { pageSelectors as ps } from '../page-locators';
import users from '../../fixtures/usersList.json';


Given(/^I open the website$/, () => {
    cy.visit(Cypress.config('baseUrl'));
});

Then(/^I am logged in as '(.*)'$/, (userType) => {
    cy.get(ps.common.username).type(`${userType}`).should('have.value', `${userType}`);
    cy.get(ps.common.password).type(Cypress.env('PASSWORD'));
    cy.get(ps.common.submitbttn).click();
    cy.get(ps.common.menuBttn).should('be.visible');
});

Then(/^I can log out$/, () => {
    cy.get(ps.common.menuBttn).click();
    cy.get(ps.common.logoutBttn).click();
    cy.get(ps.common.submitbttn).should('be.visible');
});

Then(/^I am logged in to the website$/, () => {
    users.forEach((credentials) => {
        cy.get(ps.common.username).type(credentials.username).should('have.value', credentials.username);
        cy.get(ps.common.password).type(Cypress.env('PASSWORD'));
        cy.get(ps.common.submitbttn).click();
        cy.get(ps.common.menuBttn).should('be.visible');
        cy.get(ps.common.menuBttn).click();
        cy.get(ps.common.logoutBttn).click();
        cy.get(ps.common.submitbttn).should('be.visible');
    });
});


Then(/^I connect to Snowflake$/, () => {
    cy.readFile(`cypress/fixtures/query.sql`).then(query => {
        cy.snowflake(query).then((res) => {
            //cy.log(JSON.stringify(res))
            expect(res[0].rowCount).to.equal(30)
        });
    });
});