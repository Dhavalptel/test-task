const fs = require('fs');
const path = process.argv[2];

function fileExist(path,) {
    return new Promise((resolve, reject) => {
        fs.exists(path, (exists) => {
            if (exists) {
                console.log('exists', exists);
                resolve(exists);
            } else {
                reject(new Error('File does not exist'));
            }
        })
    });
}

function getStat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
               reject(new Error('Error trying to get stats'));
            }
            console.log(stats);
            if (stats.size > 0) {
                resolve(stats.size);
            } else {
                reject(new Error('File exists but there is no content'));
            }
        });
    });
}

function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, buffer) => {
            if (err) {
               reject(new Error('Error trying to get stats'));
            }
            console.info('File was found and the contents were loaded');
            resolve(buffer);
        })
    });

}


async function getFileContents(path) {
   return Promise.all(fileExist(path), getStat(path), readFile(path));
}

getFileContents(path).then();
