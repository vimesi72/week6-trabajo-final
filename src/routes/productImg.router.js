const {
  getAll,
  create,
  remove,
} = require("../controllers/productImg.controllers");
const express = require("express");
const { verifyJwt } = require("../utils/verifyJWT");

const routerProductImg = express.Router();

routerProductImg.route("/").get(getAll).post(create);

routerProductImg.route("/:id").delete(remove);

module.exports = routerProductImg;
