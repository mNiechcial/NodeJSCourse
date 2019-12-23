
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/errorController');


const sequelize = require("./util/database");
const Product = require("./models/product");
const Cart = require('./models/cart')
const CartItem = require('./models/cartItem')
const User = require("./models/user");
const app = express();
//app.engine('handlebars', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout'}));
app.set("view engine", "ejs"); //global define
app.set("views", "views"); //not required, default route

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });



sequelize
    .sync()
    .then(result => {
        return User.findByPk(1);
        //app.listen(3000);
    })
    .then(user => {
        if (!user) {
            User.create({ name: "Miki", email: "test@test.com" });
        }
        return user;
    })
    .then(user => {
        user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        //console.log(err);
    });
