const { Category } = require("../models");

const categoryData = [
  {
    name: "Action",
  },
  {
    name: "Adventure",
  },
  {
    name: "Comedy",
  },
  {
    name: "Romance",
  },
  {
    name: "Slice of Life",
  },
];

const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;
