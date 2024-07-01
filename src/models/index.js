const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const Purchase = require("./Purchase");
const User = require("./User");

//Ingresar las relaciones entre Product-Category, Car/User/Product, Purchase/User/Product
//Product -> categoryId
Product.belongsTo(Category);
Category.hasMany(Product); // relacion 1:n

//Cart-> userId
Cart.belongsTo(User); //relacion 1:1
User.hasMany(Cart); //relacion 1:n

//Purchase -> productId
Cart.belongsTo(Product);
Product.hasMany(Cart);

//Purchase -> userId
Purchase.belongsTo(User);
User.hasMany(Purchase);

//Purchase -> productId
Purchase.belongsTo(Product);
Product.hasMany(Purchase);
