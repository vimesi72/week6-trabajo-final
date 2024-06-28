const User = require("../../models/User");

const user = async () => {
  const body = {
    firstName: "Gael",
    lastName: "Medina",
    email: "gael@gmail.com",
    password: "300572",
    phone: "3424",
  };
  await User.create(body);
};

module.exports = user;
