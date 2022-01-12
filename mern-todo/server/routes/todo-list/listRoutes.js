const router = require('express').Router();
const ListController = require('../../controllers/ListController');

router.get('/:type', ListController.getAll);
router.post('/', ListController.create);
router.put('/', ListController.update);
router.delete('/:id', ListController.delete);

module.exports = router;