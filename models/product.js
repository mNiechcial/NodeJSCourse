const fs = require('fs');
const path = require('path');

const dataPath = path.join( 
     path.dirname(process.mainModule.filename),  
    'data',
    'products.json'
)

const helperGetProductsFromFile = callback => {
    fs.readFile(dataPath, (err, fileContent) => {
        if(err){
            callback([]);
        }
        else {
            callback(JSON.parse(fileContent))
        }
    })
}
module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        helperGetProductsFromFile(products => {
            this.id = Math.random().toString();
            products.push(this);
            fs.writeFile(dataPath, JSON.stringify(products), err => {
                console.log(err);
            })
        })
    }

    static fetchAll(callback) {
        helperGetProductsFromFile(callback);
    }

    static findById(id, callback) {
        helperGetProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            callback(product);
        })
    }
}