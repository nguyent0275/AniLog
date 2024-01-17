const { CategoryName } = require("../models");

const categoryNameData = [
  {
    anime_name: 1,
    category_id: 1,
  },
  {
    anime_name: 1,
    category_id: 2,
  },
  {
    anime_name: 2,
    category_id: 1,
  },
  {
    anime_name: 2,
    category_id: 2,
  },
  {
    anime_name: 2,
    category_id: 3,
  },
  {
    anime_name: 3,
    category_id: 1,
  },
  {
    anime_name: 3,
    category_id: 2,
  },
  {
    anime_name: 3,
    category_id: 3,
  },
  {
    anime_name: 4,
    category_id: 1,
  },
  {
    anime_name: 4,
    category_id: 2,
  },
  {
    anime_name: 4,
    category_id: 3,
  },
  {
    anime_name: 5,
    category_id: 1,
  },
  {
    anime_name: 5,
    category_id: 2,
  },
  {
    anime_name: 5,
    category_id: 3,
  },
  {
    anime_name: 5,
    category_id: 4,
  },
];

const seedCategoryName = () => CategoryName.bulkCreate(categoryNameData);

module.exports = seedCategoryName;
