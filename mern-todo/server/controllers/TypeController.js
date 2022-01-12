const TypeService = require('../services/TypeService');

class TypeController {
    async create(req, res, next) {
        try {
            const {name, color} = req.body;
            const data = await TypeService.create(name, color);
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const {id, name, color} = req.body;
            const data = await TypeService.update(id, name, color);
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            const data = await TypeService.delete(id);
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async getAll(req, res, next) {
        try {
            const data = await TypeService.getAll();
            res.send({types: data});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TypeController;