const fs = require('fs');
const path = require('path');

const dataPath = path.join( 
     path.dirname(process.mainModule.filename),  
    'data',
    'products.json'
)

const helperGetProductFromFile = callback => {
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
    constructor(title, iamgeUrl, description, price) {
        this.title = title;
        this.iamgeUrl = iamgeUrl;
        this.description = description;
        this.price = price
    }

    save() {
        helperGetProductFromFile(products => {
            products.push(this);
            fs.writeFile(dataPath, JSON.stringify(products), err => {
                console.log(err);
            })
        })
    }

    static fetchAll(callback) {
        helperGetProductFromFile(callback);
    }
}