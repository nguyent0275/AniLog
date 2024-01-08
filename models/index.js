// import models
const Anime = require('./Anime');
const Category = require('./Category');
const User = require('./User');
const Status = require('./Status');
const CategoryName = require('./CategoryName');

User.hasMany(Status, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Status.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Anime.hasMany(Status, {
    foreignKey: 'anime_id',
    onDelete: 'CASCADE'
})

Status.belongsTo(Anime, {
    foreignKey: 'anime_id',
    onDelete: 'CASCADE'
})

Anime.hasMany(CategoryName, {
    foreignKey: 'anime_name',
    onDelete: 'SET NULL'
})

// CategoryName.belongsToMany(Anime, {
//     foreignKey: 'anime_name',
//     onDelete: 'SET NULL'
// })

// CategoryName.belongsTo(Category, {
//     foreignKey: 'category_id',
//     onDelete: 'SET NULL'
// })

// Category.hasOne(CategoryName, {
//     foreignKey: 'category_id',
//     onDelete: 'SET NULL'
// })

module.exports = {
    Anime,
    Category,
    CategoryName,
    Status,
    User
};