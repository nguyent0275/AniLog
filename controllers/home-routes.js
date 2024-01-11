const router = require("express").Router();
const { Anime, User, Status } = require("../models");
const withAuth = require("../utils/auth");
// i want to make sure that i can see my env vars
require("dotenv").config();

router.get("/", async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Status,
          include: {
            model: Anime,
          },
        },
      ],
    });
    console.log(userData);
    const statuses = userData.statuses.map((status) => {
      status.get({ plain: true });
    });
    res.render("list", { statuses });
    if (!userData) {
      res.status(404).json({
        message: "No user associated with that id",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/search', async (req,res) => {
  try {
    res.render('browse')
  }catch (err) {
    res.status(500).json(err)
  }
})

// paramater search is by title
router.get('/search/:title', async (req,res) => {
  try{
      // third party api fetch based on user input
      const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${req.params.title}`)
      // return data from the api fetch 
      const animeData = await response.json();
      res.json(animeData)
  } catch (err) {
      res.status(500).json(err)
  }
})

module.exports = router;
