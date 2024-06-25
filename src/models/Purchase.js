const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection");

const Purchase = sequelize.define("purchase", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});

module.exports = Purchase;
