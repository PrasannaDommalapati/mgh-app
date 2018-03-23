'use strict';
<<<<<<< HEAD
const argv            = require('yargs').argv;
const fs              = require('fs-extra');
const glob            = require('glob');
const firstline       = require('firstline');
const buildResultsDir = '../build/e2e';

let config = {
    getPageTimeout:    6000000,
    allScriptsTimeout: 50000000,
    disableChecks:     true,
    baseUrl:           'http://manage-hotels.co.uk',
    beforeLaunch:      beforeLaunch,

    params: {
        buildResultsDir: buildResultsDir,
=======

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
>>>>>>> a08ef9f175e29eda5ba4819e205ccd74acd73b6a
    },

    /**
     * CucumberJS specific
     */
    framework:     'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts:  {
        compiler: 'ts:ts-node/register',
        require:  [
<<<<<<< HEAD
            `${process.cwd()}/src/helpers/**/*.ts`,
            `${process.cwd()}/src/steps/**/*.ts`,
        ],
        format:   'json:' + buildResultsDir + '/results.json',
    },
    specs:         [],
=======
            path.resolve(process.cwd(), './src/helpers/**/*.ts'),
            path.resolve(process.cwd(), './src/steps/**/*.ts')
        ],
        format:   'json:' + buildResultsDir + '/results.json',
        tags:     argv.tags || ''
    },
    specs:         getFeatureFiles(),
>>>>>>> a08ef9f175e29eda5ba4819e205ccd74acd73b6a

    /**
     * From `protractor-cucumber-framework`, allows cucumber to handle the 199
     * exception and record it appropriately
     */
    ignoreUncaughtExceptions: true,
<<<<<<< HEAD
    /**
     * The new reporting plugin
     */
    plugins:                  [
        {
            package: 'protractor-multiple-cucumber-html-reporter-plugin',
            options: {
                automaticallyGenerateReport:  true,
                metadataKey:                  'deviceProperties',
                removeExistingJsonReportFile: true,
                removeOriginalJsonReportFile: true,
                saveCollectedJSON:            true,
                disableLog:                   true,
            },
        },
    ],
};

exports.config = config;

function beforeLaunch() {

    return Promise.all([
                           fs.remove(buildResultsDir),
                           setActiveFeatures(),
                       ]);
}

function setActiveFeatures() {

    const path = `${process.cwd()}/../features/**/*.feature`;

    return new Promise(resolve => {

        glob(path, null, (error, features) => {

            Promise
                .all(features.map(feature => {

                    return firstline(feature)
                        .then(line => featureIsActive(line) && config.specs.push(feature));
                }))
                .then(() => resolve());
        });
    });
}

function featureIsActive(line) {

    const tags = argv.hasOwnProperty('cucumberOpts') && argv.cucumberOpts.hasOwnProperty('tags') ? argv.cucumberOpts.tags.toString() : '';

    const wip = !!tags.match(/@wip/);

    return !wip ? !line.match(/@todo/) : !!line.match(/@wip/);
=======

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
>>>>>>> a08ef9f175e29eda5ba4819e205ccd74acd73b6a
}
