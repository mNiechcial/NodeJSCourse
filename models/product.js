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
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {

        helperGetProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(dataPath, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                })
            }
            else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(dataPath, JSON.stringify(products), err => {
                    console.log(err);
                })
            }

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