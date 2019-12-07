const Product = require('../models/product');

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
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/');
    }
    const productId = req.params.productId;
    Product.findById(productId, product => {
        if(!product) {
            return res.redirect('/');
        }
        console.log(product, "edit prod")
        res.render("admin/edit-product", {
            pageTitle: "Product Edition",
            path: "/admin/edit-product",
            editing: editMode,
            product: product
    })

    }); 
}

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const updatedProduct = new Product(productId, title, imageUrl, description, price);
    updatedProduct.save();
    res.redirect("/");
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
		res.render('admin/admin-products', {
			prods: products,
			pageTitle: 'Admin Products',
			path: '/admin/admin-products'
		});
	});
}