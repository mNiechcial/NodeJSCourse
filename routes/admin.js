import { Router } from "express";
import path from "path";
import rootDir from "../util/path";
const router = Router();

// /admin/add-product GET
router.use("/add-product", (req, res, next) => {
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// /admin/add-product POST
router.post("/add-product", (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
});

export default router;
