'use strict';
const dockers = require('./docker-ids');

const shell = require('shelljs');

console.log('clean up dockers',
    shell.exec(
        `docker rm -f ${Object.keys(dockers).map(index => dockers[index]).join(' ')}`,
        {silent: true}
    ).stdout
);
