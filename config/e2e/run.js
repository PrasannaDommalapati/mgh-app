'use strict';
const dockers = require('./docker-ids');
const shell = require('shelljs');

const appDir = '/usr/src/app';
const protractorCmd = `cd ${appDir}/e2e; npm run e2e;`;

console.log('run e2e tests');
let result = shell.exec(`docker exec -i ${dockers.protractorId} bash -c "${protractorCmd}"`);

shell.exit(result.code);
