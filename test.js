const sinon = require('sinon');
const chai = require('chai');
const assert = chai.assert;
const fs = require('fs');
const {fruitsSummary} = require('./app');
const BasketSummary = require('./BasketSummary');

const fruitInput = [
    {
    "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
    "max_weight": 8,
    "contents": [
        {
            "type": "apple",
            "color": "green",
            "weight": 1.5
        },
        {
            "type": "apple",
            "color": "red",
            "weight": 1
        },
        {
            "type": "pear",
            "color": "green",
            "weight": 2.5
        }
    ]
    },
    {
    "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
    "max_weight": 6,
    "contents": [
        {
            "type": "orange",
            "color": "orange",
            "weight": 2.5
        },
        {
            "type": "orange",
            "color": "orange",
            "weight": 1
        }
    ]
    }
];

it('app: successfully created the fruit basket summary by reading from file', (done) => {
    const readStub = sinon.fake.yieldsAsync(null, JSON.stringify(fruitInput));
    sinon.replace(fs, 'readFileSync', readStub);

    const fakeWrite = sinon.fake.yieldsAsync(null, undefined);
    sinon.replace(fs, 'writeFile', fakeWrite);
    fruitsSummary().then(data => {
        assert.isUndefined(data, "response should be undefined");
        done();
    })
});

it('BasketSummary: should return fruit summary', (done) => {
    const expectedFruitSummaryOutput = [
        {
            "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
            "total_fruits": 3,
            "total_weight": 5,
            "fruit_counts": [
                {
                    "type": "apple",
                    "count": 1
                },
                {
                    "type": "pear",
                    "count": 1
                }
            ]
        },
        {
            "id": "1ceb8c95-736f-4da3-86d9-86d55893b38a",
            "total_fruits": 2,
            "total_weight": 3.5,
            "fruit_counts": [
                {
                    "type": "orange",
                    "count": 1
                }
            ]
        }
    ];
    fruitsSummary().then(data => {
        const basketSummaryObj = new BasketSummary(fruitInput);
        const actualFruitSummary = basketSummaryObj.createSummary();
        assert.deepEqual(actualFruitSummary, expectedFruitSummaryOutput, 'expected output was not returned');
        done();
    })
});
