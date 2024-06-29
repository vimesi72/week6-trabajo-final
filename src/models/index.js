const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const User = require("./User");

require("./User");
require("./Category");

//Product -> categoryId
Product.belongsToMany(Category);
Category.hasMany(Product);

//Cart-> userId
Cart.belongsTo(User);
User.hasMany(Cart);

//Purchase -> productId
Cart.belongsTo(Product);
Product.hasMany(Cart);

Purchase.belongsTo(User);
User.hasMany(Purchase);

//Purchase -> productId
Purchase.belongsTo(Product);
Product.hasMany(Purchase);
