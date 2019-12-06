const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "Product Addition",
        path: "/admin/add-product",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

exports.postAddProduct = (req, res) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
		res.render('admin/admin-products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/admin-products'
		});
	});
}