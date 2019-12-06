const products = [];

export class Product {
    constructor(title) {
        this.title = title
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}