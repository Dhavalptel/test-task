const Fruit = require('./Fruit');
const _ = require('lodash');

class FruitBasket{

    constructor(id, maxWeight, contents) {
        this.id = id;
        this.max_weight = maxWeight;
        this.contents = contents;
    }

    getFruitId() {
        return this.id;
    }

    getFruitContents() {
        return this.contents;
    }
}

module.exports = FruitBasket;
