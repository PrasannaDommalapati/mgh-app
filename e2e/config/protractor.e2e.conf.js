'use strict';
const config = require('./protractor.shared.conf').config;

config.seleniumAddress = 'http://selenium-hub:4444/wd/hub';

config.multiCapabilities = [
    {
        browserName: 'chrome',
        chromeOptions: {
            args: ['disable-infobars']
        },
        shardTestFiles: true,
        maxInstances: 5,
    },
];

exports.config = config;
