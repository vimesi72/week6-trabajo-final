const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Cart = sequelize.define("cart", {
  quantity: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  //productId
  //userId -> se debe crear 2 relaciones en index.js de models
});

module.exports = Cart;
