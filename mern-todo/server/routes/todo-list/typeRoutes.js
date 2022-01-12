const router = require('express').Router();
const TypeController = require('../../controllers/TypeController');

router.get('/', TypeController.getAll);
router.post('/', TypeController.create);
router.put('/', TypeController.update);
router.delete('/:id', TypeController.delete);

module.exports = router;