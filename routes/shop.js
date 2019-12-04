import { Router } from 'express';
import path from 'path';
import rootDir from '../util/path'
import adminData from './admin'
const router = Router();

router.get('/', (req, res, next) => {
    console.log('shop.js' , adminData.products)
    res.render('shop', {prods: adminData.products, docTitle: "Shop"})
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'))
})

export default router;