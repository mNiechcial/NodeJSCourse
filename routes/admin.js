const path = require("path");
const express = require("express");
const adminController = require('../controllers/adminController')

const router = express.Router();
// /admin/add-product => GET
router.get("/add-product", adminController.getAddProduct);

router.get('/admin-products', adminController.getProducts);
// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);


export default router;
