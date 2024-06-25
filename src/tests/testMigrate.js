const sequelize = require("./utils/connection");

const testMigrate = async () => {
  try {
    sequelize.sync();
    console.log("DB connected 👊👍");
  } catch (error) {
    console.log(error);
  }
};

testMigrate();
