class Fruit {
    constructor(type, color, weight) {
        this.type = type;
        this.color = color;
        this.weight = weight;
    }

    getType() {
        return this.type;
    }

    getColor() {
        return this.color;
    }

    getWeight() {
        return this.weight;
    }
}

module.exports = Fruit;
