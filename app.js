import express from 'express';
import { urlencoded } from 'body-parser';
import adminData from './routes/admin';
import shopRoutes from './routes/shop';
import rootDir from './util/path'
import path from 'path';
import { render } from 'pug';

const app = express();
app.set('view engine', 'pug');//global define
app.set('views', 'views')//not required, default route
app.use(urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render(404, {pageTitle: "Not Found"});
})
app.listen(3000);