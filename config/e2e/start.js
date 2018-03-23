'use strict';
const dockers = require('./docker-ids');

const shell = require('shelljs');

const appId        = dockers.appId;
const apiId        = dockers.apiId;
const seleniumId   = dockers.seleniumId;
const protractorId = dockers.protractorId;
const nodeChromeId = dockers.nodeChromeId;

const appDir       = '/usr/src/app';
const srcDir       = '/usr/src/src';
const nodeCdLatest = 'headforwardsspd/node-cd:latest';

const appCmd = `cd ${appDir}; node config/server.js`;
const appUrl = 'manage-hotels.co.uk';
const apiUrl = 'api.manage-hotels.co.uk';

console.log(
    'create app docker',
    shell.exec(
        `docker run -d --name ${appId} -u root -v \`pwd\`:${appDir} ${nodeCdLatest} bash -c "${appCmd}"`,
        {silent: true}
    ).stdout
);

console.log(
    'create api docker',
    shell.exec(
        `docker run -d --name ${apiId} jamesdbloom/mockserver:mockserver-snapshot`,
        {silent: true}
    ).stdout
);

console.log(
    'create selenium-hub docker',
    shell.exec(
        `docker run -d --name ${seleniumId} --link ${appId}:${appUrl} selenium/hub`,
        {silent: true}
    ).stdout
);

const protractorLinks   = `--link ${appId}:${appUrl} --link ${apiId}:${apiUrl} --link ${seleniumId}:selenium-hub`;
const protractorVolumes = `-v \`pwd\`:${appDir} -v \`pwd\`/../src:${srcDir}`;
console.log('create protractor docker',
    shell.exec(
        `docker run -dit --name ${protractorId} ${protractorLinks} ${protractorVolumes} ${nodeCdLatest}`,
        {silent: true}
    ).stdout
);

const nodeChromeLinks = `--link ${appId}:${appUrl} --link ${apiId}:${apiUrl} --link ${seleniumId}:hub`;
console.log('create node-chrome docker',
    shell.exec(
        `docker run -d --name ${nodeChromeId} ${nodeChromeLinks} selenium/node-chrome`,
        {silent: true}
    ).stdout
);
