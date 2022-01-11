const router = require('express').Router();
const ColorController = require('../controllers/ColorController');

router.get('/', ColorController.getList);
router.post('/', ColorController.create);
router.put('/', ColorController.update);
router.delete('/:id', ColorController.delete);

module.exports = router;