'use strict';
const config = require('./protractor.shared.conf').config;

config.seleniumAddress = 'http://selenium-hub:4444/wd/hub';

config.multiCapabilities = [
    {
<<<<<<< HEAD
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

=======
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-infobars']
        },
        shardTestFiles: true,
        maxInstances: 5,
    },
>>>>>>> a08ef9f175e29eda5ba4819e205ccd74acd73b6a
];

exports.config = config;
