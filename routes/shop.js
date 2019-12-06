import { Router } from "express";
const shopController = require("../controllers/shopController");

const router = Router();

router.get("/", shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/checkout', shopController.getCheckout);
export default router;
