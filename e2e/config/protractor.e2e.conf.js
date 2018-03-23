'use strict';
const config = require('./protractor.shared.conf').config;

config.seleniumAddress = 'http://selenium-hub:4444/wd/hub';

config.multiCapabilities = [
    {
        browserName:    'chrome',
        loggingPrefs:   {
            driver:  'OFF',
            browser: 'INFO',
        },
        chromeOptions:  {
            args: ['disable-infobars'],
        },
        shardTestFiles: true,
        maxInstances:   1,
    },

];

exports.config = config;
