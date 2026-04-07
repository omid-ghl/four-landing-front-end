/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const packageJson = require('../package.json');

const execPromise = util.promisify(exec);

const v = parseInt(packageJson.version) + 1;

function editJsonFile(path, key, value, callback) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        const jsonData = JSON.parse(data);

        jsonData[key] = value;

        fs.writeFile(path, JSON.stringify(jsonData), 'utf8', (err) => {
            if (err) {
                console.error(err);
                return;
            }
            if (typeof callback === 'function') callback();
        });
    });
}

editJsonFile(
    path.resolve(__dirname, '../package.json'),
    'version',
    v.toString(),
    async () => {
        try {
            await execPromise(`git tag ${v.toString()}`);
            console.log('⏫ incremented version to ' + v);
        } catch (err) {
            console.error(err);
        }
    },
);
