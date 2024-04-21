/**
 * To turn off all uncaught exceptions handling
 * Returning false here prevents Cypress from failing the test
 */
Cypress.on('uncaught:exception', () => false);
