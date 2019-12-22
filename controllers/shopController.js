const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render("shop/product-list", {
                prods: products,
                pageTitle: "Shop",
                path: "/products"
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then(products => {
            res.render("shop/index", {
                prods: products,
                pageTitle: "Shop",
                path: "/"
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getCart = (req, res, next) => {
    req.user
        .getCart()
        .then(cart => {
            return cart.getProducts().then(products => {
                res.render("shop/cart", {
                    path: "/cart",
                    pageTitle: "Your Cart",
                    products: products
                });
            });
        })
        .catch(err => {
            console.log(err);
        });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    req.user
        .getCart()
        .then(cart => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then(products => {
            if (products.length > 0) {
                product = products[0];
            }
            let newQuantity = 1;
            if (product) {
            }
            return Product.findByPk(prodId)
                .then(product => {
                   return fetchedCart
                    .addProduct(product, {through: { quantity: newQuantity }}); 
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

    Product.findByPk(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect("/cart");
};

exports.postCartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect("/cart");
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout"
    });
};
exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Orders"
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            res.render("shop/product-detail", {
                product: product,
                path: "/products",
                pageTitle: product.title
            });
        })
        .catch(err => {
            console.log(err);
        });
};
