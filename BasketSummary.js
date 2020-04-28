const Fruit = require('./Fruit');
const FruitBasket = require('./FruitBasket');

class BasketSummary {
    constructor(fruitsDetails) {
        this.fruitsDetails = fruitsDetails;
    }

    createSummary() {
        return this.fruitsDetails.map(fruitDetail => {
           const fruitBasketObj = new FruitBasket(fruitDetail.id, fruitDetail.max_weight, fruitDetail.contents);
           const fruitContentSummary = [];
           let fruitTotalWeight = 0;
           fruitBasketObj.getFruitContents().map(content => {
               const fruitObj = new Fruit(content.type, content.color, content.weight);
               const fruitType = fruitObj.getType();
               const fruitContentTypeExist = fruitContentSummary.find(summary => summary.type === fruitType);
               if (!fruitContentTypeExist) {
                   fruitContentSummary.push({type: fruitType, count: 1})
               } else {
                   fruitContentSummary.count++;
               }
               fruitTotalWeight = fruitTotalWeight + fruitObj.getWeight();
           });
            return {
                id: fruitBasketObj.getFruitId(),
                total_fruits: fruitBasketObj.getFruitContents().length,
                total_weight: fruitTotalWeight,
                fruit_counts: fruitContentSummary
            }
       })
    }
}

module.exports = BasketSummary;
