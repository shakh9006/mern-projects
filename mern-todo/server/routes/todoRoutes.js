const router = require('express').Router();
const colorRoutes = require('./colorRoutes');

router.use('/color', colorRoutes);

module.exports = router;