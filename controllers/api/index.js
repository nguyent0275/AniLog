const router = require('express').Router();
const userRoutes = require('./user-routes');
const animeRoutes = require('./anime-routes');
const statusRoutes = require('./status-routes');
const categoryRoutes = require('./category-routes');
const animeCategoryRoutes = require('./animeCategory-routes')

router.use('/user', userRoutes);
router.use('/anime', animeRoutes);
router.use('/status', statusRoutes);
router.use('/category', categoryRoutes);
router.use('/animeCate', animeCategoryRoutes)

module.exports = router;
