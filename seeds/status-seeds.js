const { Status } = require("../models");

const statusData = [
  {
    user_id: 1,
    watch_status: "completed",
    rating: 10,
    anime_id: 1,
  },
  {
    user_id: 1,
    watch_status: "watching",
    rating: 8,
    anime_id: 2,
  },
  {
    user_id: 1,
    watch_status: "planning",
    rating: null,
    anime_id: 3,
  },
  {
    user_id: 1,
    watch_status: "dropped",
    rating: 2,
    anime_id: 4,
  },
  {
    user_id: 1,
    watch_status: "completed",
    rating: 9,
    anime_id: 5,
  },
  {
    user_id: 2,
    watch_status: "watching",
    rating: 7,
    anime_id: 1,
  },
  {
    user_id: 2,
    watch_status: "dropped",
    rating: 2,
    anime_id: 2,
  },
  {
    user_id: 2,
    watch_status: "completed",
    rating: 9,
    anime_id: 3,
  },
  {
    user_id: 2,
    watch_status: "dropped",
    rating: 3,
    anime_id: 4,
  },
  {
    user_id: 2,
    watch_status: "planning",
    rating: null,
    anime_id: 5,
  },
  {
    user_id: 3,
    watch_status: "planning",
    rating: null,
    anime_id: 1,
  },
  {
    user_id: 3,
    watch_status: "planning",
    rating: null,
    anime_id: 2,
  },
  {
    user_id: 3,
    watch_status: "planning",
    rating: null,
    anime_id: 3,
  },
  {
    user_id: 3,
    watch_status: "planning",
    rating: null,
    anime_id: 4,
  },
  {
    user_id: 3,
    watch_status: "watching",
    rating: 6,
    anime_id: 5,
  },
  {
    user_id: 4,
    watch_status: "completed",
    rating: 5,
    anime_id: 1,
  },
  {
    user_id: 4,
    watch_status: "completed",
    rating: 7,
    anime_id: 2,
  },
  {
    user_id: 4,
    watch_status: "completed",
    rating: 6,
    anime_id: 3,
  },
  {
    user_id: 4,
    watch_status: "completed",
    rating: 10,
    anime_id: 4,
  },
  {
    user_id: 4,
    watch_status: "completed",
    rating: 3,
    anime_id: 5,
  },
];

const seedStatus = () => Status.bulkCreate(statusData);

module.exports = seedStatus;
