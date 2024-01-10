const router = require('express').Router();
const { Anime, User } = require('../models');
const withAuth = require('../utils/auth');
// i want to make sure that i can see my env vars
require('dotenv').config();

router.get('/', async (req,res) => {
    try {
        res.render('home')
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', async (req,res) => {
    try {
        res.render('login')
    } catch (err) {
        res.status(500).json(err)
    }
})

// router.get('/profile', withAuth, async (req,res) => {
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password']}
//         })
//     }
// })

module.exports = router;