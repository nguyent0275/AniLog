const router = require("express").Router();
const { Anime, CategoryName, Category } = require("../../models");

// the application end point is /api/anime
router.get("/", async(req, res) => {
res.render('anime-request');
})


router.get("/", async(req, res) => {
    try{
        // finds all animes
        const animeData = await Anime.findAll({
            // gets each anime's associated category name
            // include: [{model: CategoryName, model: Category}]
        });
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(animeData)
    } catch (err) {
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

        // sending the data to front end (/public/js/anime-search.js)
        res.json(animeData)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.get("/:id", async(req, res) => {
    try{
        // finds anime by their primary key (uuid)
        const animeData = await Anime.findByPk(req.params.id, {
            // gets anime's associated status/list
            // include: [{model: CategoryName, model: Category}]
        }
        );
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(animeData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/", async (req,res) => {
    try {
        // creates a new anime
        const animeData = await Anime.create(req.body);
        res.status(200).json(animeData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const animeData = await Anime.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    if(!animeData){
        res.status(404).json({
            message: "No anime associated with that id"
        })
        return;
    }
        res.statusMessage(200).json(animeData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const animeData = await Anime.destroy({
            where: {
                id: req.params.id
            }
        });
        if(!animeData){
            res.status(404).json({
                message: "No anime associated with that id"
            })
            return;
        }
        res.status(200).json(animeData)
    } catch {
        res.status(500).json(err)
    }
});

module.exports = router;