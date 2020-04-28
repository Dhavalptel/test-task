const fs = require('fs');
const BasketSummary = require('./BasketSummary');

const fruitsSummary = async () => {
    return new Promise((resolve, reject) => {
        fs.readFileSync('input.json', 'utf8',  (err, data) => {
            if (err){
                console.error('Error while reading the input file');
                reject(err);
            } else {
                const basketSummary = new BasketSummary(JSON.parse(data));
                const summary = basketSummary.createSummary();
                fs.writeFile('output.json', JSON.stringify(summary), 'utf8', (err) => {
                    if (err) {
                        console.error('Error while writing the output into file');
                        reject(err);
                    } else {
                       resolve();
                    }
                });
            }
        });
    });
};

fruitsSummary().then();


module.exports = {fruitsSummary};



