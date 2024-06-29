const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");

const getAll = catchError(async (req, res) => {
  const results = await Purchase.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const userId = req.user.id;

  const cart = await Cart.findAll({
    where: { userId },
    raw: true,
    attributes: ["quantity", "userId", "productId"],
  });

  const result = await Purchase.bulkCreate(cart);
  await Cart.destroy({ where: { userId } });
  return res.status(201).json(result);
});

module.exports = {
  getAll,
  create,
};
