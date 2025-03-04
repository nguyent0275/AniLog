const router = require("express").Router();
const { User, Status } = require("../models");
const withAuth = require("../utils/auth");
// i want to make sure that i can see my env vars
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    res.render("home", {
      loggedIn: req.session.logged_in,
      userName: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login", {
      loggedIn: req.session.logged_in,
      userName: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Status,
        },
      ],
    });
    const user = userData.get({ plain: true });
    if (!userData) {
      res.status(404).json({
        message: "No user associated with that id",
      });
    } else {
      res.render("list", {
        user,
        loggedIn: req.session.logged_in,
        userName: req.session.user_name,
      });
    }
  } catch (err) {
    // want to redirect to home page if user is not logged in
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  try {
    res.render("search", {
      loggedIn: req.session.logged_in,
      userName: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// paramater search is by title
router.get("/search/:title", async (req, res) => {
  try {
    // third party api fetch based on user input
    const response = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${req.params.title}`
    );
    // return data from the api fetch
    const animeData = await response.json();
    res.json(animeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// render invidividual anime page with all it's info
router.get("/anime/:id", async (req, res) => {
  try {
    res.render("anime-page", {
      animeId: req.params.id,
      loggedIn: req.session.logged_in,
      userName: req.session.user_name,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
