const ColorService = require('../services/ColorService');

class ColorController {
    async create(req, res, next) {
        try {
            const {name, color} = req.body;
            const data = await ColorService.create(name, color);
            res.send({message: 'Color created successfully', data: {...data}});
        } catch (e) {
            next(e);
        }
    }

    async getList(req, res, next) {
        try {
            const data = await ColorService.getColorList();
            res.send({list: data});
        } catch (e) {
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            const {id, name, color} = req.body;
            const data = await ColorService.update(id, name, color);
            res.send({message: 'Color updated successfully', ...data});
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const data = await ColorService.delete(id);
            res.send({message: 'Color deleted successfully', ...data});
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ColorController;