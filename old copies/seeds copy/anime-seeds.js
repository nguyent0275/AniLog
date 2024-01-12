const { Anime } = require("../models");

const animeData = [
  {
    title: "Attack on Titan",
  },
  {
    title: "Jujutsu Kaisen",
  },
  {
    title: "Naruto",
  },
  {
    title: "Bleach",
  },
  {
    title: "Dragonball Z",
  },
];

const seedAnime = () => Anime.bulkCreate(animeData);

module.exports = seedAnime;
