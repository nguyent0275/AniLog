const { Status } = require("../models");

const statusData = [
  {
    user_id: 1,
    anime_title: "Naruto",
    watch_status: "completed",
    rating: 10,
  },
  {
    user_id: 1,
    anime_title: "Bleach",
    watch_status: "watching",
    rating: 8,
  },
  {
    user_id: 1,
    anime_title: "One Piece",
    watch_status: "planning",
    rating: null,
  },
  {
    user_id: 1,
    anime_title: "Dragonball Z",
    watch_status: "dropped",
    rating: 2,
  },
  {
    user_id: 1,
    anime_title: "Akira",
    watch_status: "completed",
    rating: 9,
  },
];

const seedStatus = () => Status.bulkCreate(statusData);

module.exports = seedStatus;
