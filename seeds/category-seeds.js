const { Category } = require("../models");

const categoryData = [
  {
    category_name: "Action",
  },
  {
    category_name: "Adventure",
  },
  {
    category_name: "Comedy",
  },
  {
    category_name: "Romance",
  },
  {
    category_name: "Slice of Life",
  },
];

const seedCategory = () => Category.bulkCreate(categoryData);

module.exports = seedCategory;
