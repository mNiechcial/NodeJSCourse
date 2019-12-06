exports.get404 = (req, res, next) => {
    res.status(404).render('notFound', {path: '', pageTitle: "Not Found", path: '/404'});
}