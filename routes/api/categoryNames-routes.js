const router = require("express").Router();
const { Anime, CategoryName, Category } = require("../../models");

// the application end point is /api/categoryName

router.get("/", async(req, res) => {
    try{
        // finds all categories
        const categoryNameData = await CategoryName.findAll({
            // gets each categoryName's associated category name
            // include: [{model: CategoryNameName, model: CategoryName}]
        });
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(categoryNameData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get("/:id", async(req, res) => {
    try{
        // finds categoryName by their primary key (uuid)
        const categoryNameData = await CategoryName.findByPk(req.params.id, {
            // gets categoryName's associated status/list
            // include: [{model: CategoryNameName, model: CategoryName}]
        }
        );
        //200 status code means sucessful connection and returns the data from the get route, 500 means error and will serve the error
        res.status(200).json(categoryNameData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/", async (req,res) => {
    try {
        // creates a new categoryName
        const categoryNameData = await CategoryName.create(req.body);
        res.status(200).json(categoryNameData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const categoryNameData = await CategoryName.update(req.body, {
        where: {
            id: req.params.id,
        },
    });
    if(!categoryNameData){
        res.status(404).json({
            message: "No categoryName associated with that id"
        })
        return;
    }
        res.statusMessage(200).json(categoryNameData)
    } catch (err) {
        res.status(500).json(err)
    }
})


router.delete("/:id", async (req, res) => {
    try {
        const categoryNameData = await CategoryName.destroy({
            where: {
                category_id: req.params.id
            }
        });
        if(!categoryNameData){
            res.status(404).json({
                message: "No categoryName associated with that id"
            })
            return;
        }
        res.status(200).json(categoryNameData)
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;