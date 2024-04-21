# cypress-e2e-tests

Automation testing project.

### Framework structure

```
/cypress - fixtures, gherkin scenarios, selectors, step definitions and commands to help to run tests.
    /fixtures - fixtures are used as external pieces of static data that can be used by tests.
    /integration - feature files with Gherkin scenarios.
    /plugins - contains files to support and extend the behaviour of Cypress.
        /index.js - list of Cypress plugins and custom tasks we use.
    /support - contains all files required to help to run tests.
        /commands - the support files to put reusable behavior such as Custom Commands or global overrides that are available to all of your spec files.
        /page-selectors - contains page selectors to be able to interact with the page.
        /step-definitions - .js files that define the test steps used in automated tests.
        /e2e.js - default Cypress file that runs before every single spec file. Contains before/after hooks and some other Cypress settings.
cypress.config.js -  file used to store the configuration values. 
cypress.env.json - file with environment configs that stores passwords and other sensitive environment related information.
```
### Environment File

All environment related variables are stored in the `cypress.config.js` file.

There is also a need in a `cypress.env.json` file with environment variables that stores passwords and other sensitive environment related information. This file is being ignored by git and you have to create it yourself.

Before you can run tests, you must ensure you have the following in your `cypress.env.json` file:

```
{
	"PASSWORD": "yourPassword"
}
```

### How to execute tests locally

1. Clone the project (e.g. via CLI `git clone https://github.com/kategaba/cypress_course`). NOTE: to be able to use git commands git should be installed on your computer (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). Also, you should have a github account with access to the repo you're trying to clone. After running `git clone <repo link>` you'll be asked to provide your github username and password.
2. Install node.js and npm (https://nodejs.org/en/) on your computer. If it's already installed, make sure that their version is up to date.
3. Go to the main folder of the project. You'll need to be in that folder when running scripts below.
4. Run `npm install` - it will install required npm dependencies.
5. Make sure you have `cypress.env.json` with all required information.
6. Run `npm run test:e2e:debug` - it will run e2e tests in debug mode. After running this command the cypress window will be opened and you will be able to run all tests (click 'Run all specs') or a separate feature file (just click on the file you want to run) from there.

### How tests are done

#### Feature files

Tests were written using the BDT approach and Gherkin language.

Example of a test:

```gherkin
Feature: Login and log out

    Scenario Outline: As a User I want to log in
        Given I am logged in as '<userType>'
        Examples:
            | userType                |
            | standard_user           |
```

Feature description contains short flow description.
Every line of Scenario starting with Given/When/Then/And represents a javascript function.

#### Step definitions

Step definition files are `.js` files that define the test steps used in automated tests. These are then called by the `.feature` files. These methods can be referenced from any `.feature` file.

An example of step definition:

```javascript
Given(/^(?:I am|I'm) logged in as '(.*)'$/, (userType) => {
    cy.visit(Cypress.config('baseUrl'));
    cy.get(ps.common.username).type(`${userType}`);
    cy.get(ps.common.passwordInput).type(Cypress.env('PASSWORD'));
    cy.get(ps.common.loginSubmitBttn).click();
});
```