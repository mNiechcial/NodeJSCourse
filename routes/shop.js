import { Router } from "express";
const shopController = require("../controllers/shopController");

const router = Router();

router.get("/", shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct)
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart)
router.post('/cart-delete-item', shopController.postCartDeleteItem)
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);

export default router;
