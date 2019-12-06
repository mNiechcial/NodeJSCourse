import { Router } from "express";
const productsController = require("../controllers/productsController");

const router = Router();

router.get("/", productsController.getProducts);

export default router;
