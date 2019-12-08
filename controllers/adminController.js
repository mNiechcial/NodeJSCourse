const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Product Addition",
        path: "/admin/add-product",
        editing: false
    });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    })
        .then(result => {
            console.log(result);
            res.redirect('/admin/admin-products')
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            if (!product) {
                return res.redirect("/");
            }
            res.render("admin/edit-product", {
                pageTitle: "Product Edition",
                path: "/admin/edit-product",
                editing: editMode,
                product: product
            });
        })
        .catch(err => {
            console.log(err);
        });
    const productId = req.params.productId;
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const updatedProduct = new Product(
        productId,
        title,
        imageUrl,
        description,
        price
    );
    Product.findByPk(productId)
        .then(product => {
            product.title = title;
            product.price = price;
            product.imageUrl = imageUrl;
            product.description = description;
            return product.save();
        })
        .then(result => {
            res.redirect("/");
        })
        .catch(err => console.log(err));
};
exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render("admin/admin-products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/admin-products"
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    console.log(productId, "prodId");
    Product.findByPk(productId)
        .then(product => {
            return product.destroy();
        })
        .then(result => {
            res.redirect("/admin/admin-products");
        })
        .catch(err => console.log(err))

};
