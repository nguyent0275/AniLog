const router = require("express").Router();
const { Anime, AnimeCategory, Category } = require("../../models");

// the application end point is /api/animeCategory

router.get("/", async(req, res) => {
    try{
        // finds all categories
        const animeCategoryData = await AnimeCategory.findAll({
            // gets each animeCategory's associated category name
            // include: [{model: AnimeCategoryName, model: AnimeCategory}]
        });
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(animeCategoryData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async(req, res) => {
    try{
        // finds animeCategory by their primary key (uuid)
        const animeCategoryData = await AnimeCategory.findByPk(req.params.id, {
            // gets animeCategory's associated status/list
            // include: [{model: AnimeCategoryName, model: AnimeCategory}]
        }
        );
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(animeCategoryData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/", async (req,res) => {
    try {
        // creates a new animeCategory
        const animeCategoryData = await AnimeCategory.create(req.body);
        res.status(200).json(animeCategoryData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const animeCategoryData = await AnimeCategory.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    if(!animeCategoryData){
        res.status(404).json({
            message: "No animeCategory associated with that id"
        })
        return;
    }
        res.statusMessage(200).json(animeCategoryData)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const animeCategoryData = await AnimeCategory.destroy({
            where: {
                category_id: req.params.id
            }
        });
        if(!animeCategoryData){
            res.status(404).json({
                message: "No animeCategory associated with that id"
            })
            return;
        }
        res.status(200).json(animeCategoryData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;