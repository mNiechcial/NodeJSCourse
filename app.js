import express from 'express';
import { urlencoded } from 'body-parser';
import adminData from './routes/admin';
import shopRoutes from './routes/shop';
import rootDir from './util/path'
import path from 'path';
import { render } from 'pug';
import expressHbs from 'express-handlebars';

const app = express();
//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set('view engine', 'ejs');//global define
app.set('views', 'views')//not required, default route
app.use(urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('notFound', {path: '', pageTitle: "Not Found"});
})
app.listen(3000);