'use strict';
const dockers = require('./docker-ids');
const shell = require('shelljs');

const appDir = '/usr/src/app';

console.log(
    'build protractor',
    shell.exec(
        `docker exec -i ${dockers.protractorId} bash -c "cd ${appDir}/e2e; rimraf typings; typings install; npm prune; npm install;"`,
        {silent: true}
    ).stdout
);
