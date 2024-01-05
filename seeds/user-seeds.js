const { User } = require("../models");

const userData = [
  {
    user_name: "torappyu",
    pass_word: "sadasdafsdf",
    email: "toan@gmail.com",
  },
  {
    user_name: "ben",
    pass_word: "sadasdf",
    email: "ben@gmail.com",
  },
  {
    user_name: "peter",
    pass_word: "dasdafsdf",
    email: "peter@gmail.com",
  },
  {
    user_name: "james",
    pass_word: "sadasdadf",
    email: "james@gmail.com",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
