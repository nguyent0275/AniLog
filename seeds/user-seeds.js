const { User } = require("../models");

const userData = [
  {
    user_name: "admin",
    password: "password123",
    email: "admin@youranimesucks.com",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
