// import models
const Anime = require('./Anime');
const Category = require('./Category');
const User = require('./User');
const Status = require('./Status');
const CategoryName = require('./CategoryName');


// Status.belongsTo(User, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// User.hasMany(Status, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// })


// Status.belongsTo(Anime, {
//   foreignKey: 'anime_id',
//   onDelete: 'CASCADE'
// });


// Anime.belongsToMany(Category, {
//   through: CategoryName,
//   foreignKey: 'anime_id',
// });


// Category.belongsToMany(Anime, {
//   through: CategoryName,
//   foreignKey: 'category_category_id',
// })

// CategoryName.belongsTo(Category, {
//     foreignKey: 'category_id',
//     onDelete: 'CASCADE'
// })

// CategoryName.belongsToMany(Anime, {
//     through: CategoryName,
//     foreignKey: 'anime_name',
//     onDelete: 'CASCADE'
// })

module.exports = {
    Anime,
    Category,
    CategoryName,
    Status,
    User
};