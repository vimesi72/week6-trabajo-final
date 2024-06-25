const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const ProductImg = sequelize.define("productImg", {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = ProductImg;
