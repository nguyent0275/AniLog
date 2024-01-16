const { User } = require("../models");

const userData = [
  {
    user_name: "torappyu",
    password: "sadasdafsdf",
    email: "toan@gmail.com",
  },
  {
    user_name: "ben",
    password: "sadasdf",
    email: "ben@gmail.com",
  },
  {
    user_name: "peter",
    password: "dasdafsdf",
    email: "peter@gmail.com",
  },
  {
    user_name: "james",
    password: "sadasdadf",
    email: "james@gmail.com",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
