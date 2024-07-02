require("../models");
const sequelize = require("../utils/connection");
const user = require("./createData/user");

const testMigrate = async () => {
  try {
    await sequelize.sync();
    console.log("DB connected 👊👍");

    await user();

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

testMigrate();
