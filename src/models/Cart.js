const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Cart = sequelize.define("cart", {
  quantity: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
  //productId
  //userId -> se lo obtiene del req.user.id
});

module.exports = Cart;
