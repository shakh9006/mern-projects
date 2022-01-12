const router = require('express').Router();
const colorRoutes = require('./todo-list/colorRoutes');
const typeRoutes = require('./todo-list/typeRoutes');
const listRoutes = require('./todo-list/listRoutes');

router.use('/color', colorRoutes);
router.use('/type', typeRoutes);
router.use('/list', listRoutes);

module.exports = router;