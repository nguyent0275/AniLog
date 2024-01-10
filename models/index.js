// import models
const Anime = require('./Anime');
const Category = require('./Category');
const User = require('./User');
const Status = require('./Status');
const AnimeCategory = require('./AnimeCategory');

// 1 to many
User.hasMany(Status, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})
Status.belongsTo(User)

// 1 to many
Anime.hasMany(Status, {
    foreignKey: 'anime_id',
    onDelete: 'CASCADE'
})
Status.belongsTo(Anime)

User.belongsToMany(Anime, {
    through: Status,
    foreignKey: 'user_id'
})

Anime.belongsToMany(User, {
    through: Status,
    foreignKey: 'anime_id'
})


// many to many
Anime.belongsToMany(Category, {
    through: AnimeCategory
})

Category.belongsToMany(Anime, {
    through: AnimeCategory
})

// // 1 to 1
// Category.hasOne(AnimeCategory, {
//     foreignKey: 'category_id',
//     onDelete: 'SET NULL'
// })
// AnimeCategory.belongsTo(Category)

// // 1 to many
// Anime.hasMany(AnimeCategory, {
//     foreignKey: 'anime_name',
//     onDelete: 'SET NULL'
// })
// AnimeCategory.belongsTo(Anime)

module.exports = {
    Anime,
    Category,
    AnimeCategory,
    Status,
    User
};