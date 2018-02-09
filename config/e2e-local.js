'use strict';
const shell         = require('shelljs');
const uuid          = require('uuid/v4');

let appId        = uuid();
let seleniumId   = uuid();
let protractorId = uuid();
let nodeChromeId = uuid();

let appCmd = 'cd /usr/src/app; node config/server.js';
let appUrl = 'hotels.com';

let protractorCmd = 'cd /usr/src/app/e2e; npm prune; npm install; mkdir -p /usr/src/app/build/e2e; npm test; cat /usr/src/app/build/e2e/test-results.json | /usr/src/app/e2e/node_modules/.bin/cucumber-junit > /usr/src/app/build/e2e/test-results.xml';

console.log(
    'create app docker',
    shell.exec(
        'docker run -d --name ' + appId + ' -u root -v `pwd`:/usr/src/app headforwardsspd/node-cd:latest bash -c "' + appCmd + '"',
        {silent: true}
    ).stdout);

console.log(
    'create selenium-hub docker',
    shell.exec(
        'docker run -d --name ' + seleniumId + ' --link ' + appId + ':' + appUrl + ' selenium/hub',
        {silent: true}
    ).stdout);

console.log('create protractor docker',
    shell.exec(
        'docker run -dit --name ' + protractorId + '  --link ' + appId + ':' + appUrl + ' --link ' + seleniumId + ':selenium-hub -v `pwd`:/usr/src/app headforwardsspd/node-cd:latest',
        {silent: true}
    ).stdout);

console.log('create node-chrome docker',
    shell.exec(
        'docker run -d --name ' + nodeChromeId + ' --link ' + appId + ':' + appUrl + ' --link ' + seleniumId + ':hub --link ' + protractorId + ':api selenium/node-chrome',
        {silent: true}
    ).stdout);

console.log('rebuild app', shell.exec('npm prune && npm i && npm run build-staging', {silent: true}).stdout);

console.log('run e2e tests');

let result = shell.exec('docker exec -i ' + protractorId + ' bash -c "' + protractorCmd + '"');

console.log('clean up dockers',
    shell.exec(
        'docker rm -f ' + [appId, seleniumId, protractorId, nodeChromeId].join(' '),
        {silent: true}
    ).stdout);

shell.exit(result.code);