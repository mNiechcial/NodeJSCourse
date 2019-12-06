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
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
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