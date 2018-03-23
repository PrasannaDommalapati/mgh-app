'use strict';
const shell = require('shelljs');

console.log(
    'build app',
    shell.exec(
        'npm prune && npm i && npm run build-e2e',
        {silent: true}
    ).stdout
);
