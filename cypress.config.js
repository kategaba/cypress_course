const { defineConfig } = require('cypress');

module.exports = defineConfig({
	chromeWebSecurity: false,
	modifyObstructiveCode: false,
	watchForFileChanges: true,
	defaultCommandTimeout: 40000,
	requestTimeout: 30000,
	responseTimeout: 60000,
	viewportWidth: 1280,
	viewportHeight: 1024,
	videoCompression: 15,
	fixturesFolder: 'cypress/fixtures',
	screenshotsFolder: 'cypress/screenshots',
	videosFolder: 'cypress/videos',
	downloadsFolder: 'cypress/downloads',
	e2e: {
		baseUrl: 'https://www.saucedemo.com/',
		specPattern: 'cypress/integration/**/*.feature',
		supportFile: 'cypress/support/e2e.js',
		//numTestsKeptInMemory: 1,
		experimentalMemoryManagement: true,
		setupNodeEvents(on, config) {
			// implement node event listeners here
			// eslint-disable-next-line
			return require('./cypress/plugins/index')(on, config);
		},
	},
	env: {
		USER: 'standard_user',
	},
	projectId: '',
	retries: {
		runMode: 2,
		openMode: 0,
	},
});