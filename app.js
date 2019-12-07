import express from "express";
import { urlencoded } from "body-parser";
import adminRoutes from "./routes/admin";
import shopRoutes from "./routes/shop";
import rootDir from "./util/path";
import path from "path";
import errorController from "./controllers/errorController";

const db = require('./util/database')

const app = express();
//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set("view engine", "ejs"); //global define
app.set("views", "views"); //not required, default route

app.use(urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err, "err")
    });
app.use(errorController.get404);

app.listen(3000);
