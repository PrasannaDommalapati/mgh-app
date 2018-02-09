'use strict';

const argv = require('yargs').argv;
const fs   = require('fs-extra');
const path = require('path');

const buildResultsDir = '../build/e2e';

exports.config = {
    getPageTimeout:    6000000,
    allScriptsTimeout: 50000000,
    disableChecks:     true,
    baseUrl:           'http://.hotels.co.uk',
    beforeLaunch:      () => fs.removeSync(buildResultsDir),

    params: {
        buildResultsDir: buildResultsDir
    },

    /**
     * CucumberJS specific
     */
    framework:     'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts:  {
        compiler: 'ts:ts-node/register',
        require:  [
            path.resolve(process.cwd(), './src/helpers/**/*.ts'),
            path.resolve(process.cwd(), './src/steps/**/*.ts')
        ],
        format:   'json:' + buildResultsDir + '/results.json',
        tags:     argv.tags || ''
    },
    specs:         getFeatureFiles(),

    /**
     * From `protractor-cucumber-framework`, allows cucumber to handle the 199
     * exception and record it appropriately
     */
    ignoreUncaughtExceptions: true,

    /**
     * The new reporting plugin
     */
    plugins: [{
        package: 'protractor-multiple-cucumber-html-reporter-plugin',
        options: {
            automaticallyGenerateReport:  true,
            metadataKey:                  'deviceProperties',
            removeExistingJsonReportFile: true,
            removeOriginalJsonReportFile: true,
            saveCollectedJSON:            true
        }
    }]
};

/**
 * Get the featurefiles that need to be run based on an command line flag that is passed, if nothing is passed all the
 * featurefiles are run
 *
 * @example:
 *
 * <pre>
 *     // For 1 feature
 *     npm run e2e -- --feature=playground
 *
 *     // For multiple features
 *     npm run e2e -- --feature=playground,dashboard,...
 *
 *     // Else
 *     npm run e2e
 * </pre>
 */
function getFeatureFiles() {
    // if (argv.feature) {
    //     return argv.feature.split(',').map(feature => `${process.cwd()}/e2e-tests/**/${feature}.feature`);
    // }

    return [`${process.cwd()}/../../../src/**/*.feature`];
}
