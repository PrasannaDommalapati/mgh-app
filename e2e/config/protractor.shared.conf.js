'use strict';
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
    },

    /**
     * CucumberJS specific
     */
    framework:     'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts:  {
        compiler: 'ts:ts-node/register',
        require:  [
            `${process.cwd()}/src/helpers/**/*.ts`,
            `${process.cwd()}/src/steps/**/*.ts`,
        ],
        format:   'json:' + buildResultsDir + '/results.json',
    },
    specs:         [],

    /**
     * From `protractor-cucumber-framework`, allows cucumber to handle the 199
     * exception and record it appropriately
     */
    ignoreUncaughtExceptions: true,
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
}
