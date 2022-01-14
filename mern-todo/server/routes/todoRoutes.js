const router = require('express').Router();
const colorRoutes = require('./todo-list/colorRoutes');
const typeRoutes = require('./todo-list/typeRoutes');
const listRoutes = require('./todo-list/listRoutes');
const checkAccessToken = require('../middlewares/checkAccessToken');

router.use('/color', checkAccessToken, colorRoutes);
router.use('/type', checkAccessToken, typeRoutes);
router.use('/list', checkAccessToken, listRoutes);

module.exports = router;