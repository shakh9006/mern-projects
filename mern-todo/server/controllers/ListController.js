const ListService = require('../services/ListService');

class ListController {
    async create(req, res, next) {
        try {
            const {title, type} = req.body;
            const data = await ListService.create(title, type);
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {id, title, checked, type} = req.body;
            const data = await ListService.update(id, title, checked, type);
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const data = await ListService.delete(id);
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const {type} = req.params;
            const data = await ListService.getAll(type);
            res.send({list: data});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new ListController;

