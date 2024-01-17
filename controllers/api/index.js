const router = require('express').Router();
const userRoutes = require('./user-routes');
const animeRoutes = require('./anime-routes');
const statusRoutes = require('./status-routes');
const categoryRoutes = require('./category-routes');
const categoryNameRoutes = require('./categoryNames-routes')

router.use('/user', userRoutes);
router.use('/anime', animeRoutes);
router.use('/status', statusRoutes);
router.use('/categories', categoryRoutes);
router.use('/categoryNames', categoryNameRoutes)

module.exports = router;
