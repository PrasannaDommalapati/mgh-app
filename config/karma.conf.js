const webpackConfig = require('./webpack.test');

module.exports = function (config) {
	const _config = {
		basePath: '',

		frameworks: ['jasmine'],

		files: [
			{pattern: './config/karma-test-shim.js', watched: false}
		],

		preprocessors: {
			'./config/karma-test-shim.js': ['coverage', 'webpack', 'sourcemap']
		},

		webpack: webpackConfig,

		webpackMiddleware: {
			stats: 'errors-only'
		},

		webpackServer: {
			noInfo: true
		},

		reporters: ['mocha', 'coverage', 'remap-coverage', 'junit'],

		coverageReporter: {
			type: 'in-memory'
		},

		remapCoverageReporter: {
			json:      './build/unit/code-coverage.json',
			html:      './build/unit/code-coverage',
			cobertura: './build/unit/code-coverage.xml'
		},
		junitReporter: {
			outputDir:      './build/unit',
			outputFile:     'test-results.xml',
			suite:          'Karma Unit Tests',
			useBrowserName: false
		},
		colors:    true,
		autoWatch: false,
		browsers:  ['PhantomJS'],
		singleRun: true,
		logLevel:  config.LOG_DISABLE
	};

	config.set(_config);
};
