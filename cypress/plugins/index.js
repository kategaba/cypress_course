// ***********************************************************
// This functions are called when a project is opened or re-opened (e.g. due to
// the project's config changes)
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

const browserify = require('@cypress/browserify-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { preprocessor } = require('@badeball/cypress-cucumber-preprocessor/browserify');
const snowflake = require("snowflake-sdk");

const connection = snowflake.createConnection({
    account: '',
    username: '',
    password: '',
    application: '',
  });
connection.connect();

module.exports = async (on, config) => {
	await addCucumberPreprocessorPlugin(on, config);

	on(
		'file:preprocessor',
		preprocessor(config, {
			...browserify.defaultOptions,
		}),
	);

	on('task', {
        snowflake: sql => 
			new Promise((resolve, reject) => {
				connection.execute({
					sqlText: sql,
					fetchAsString: ['JSON'],
					complete(err, stmt, rows) {
						stmt;
						if (err) {
							reject(err.message);
						} else {
							resolve(rows);
						}
					},
				});
			}),
	});

	return {
		...config,
	};
};


