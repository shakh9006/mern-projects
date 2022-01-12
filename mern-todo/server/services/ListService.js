const ApiError = require('../exceptions/ApiError');
const List = require('../models/listModel');
const TypeService = require('../services/TypeService');

class ListService {
    async create(title, typeId) {
        const type = await TypeService.findOneBy({_id: typeId});
        if ( !type )
            throw ApiError.BadRequest(`Type with id: ${typeId} is not exist`);

        const list = await List.create({title, typeId});
        await list.save();

        return {
            id: list._id,
            title: list.title,
            checked: list.checked,
            type: {
                typeId: type._id,
                name: type.name
            }
        };
    }

    async update(id, title, checked, typeId) {
        const list = await this.findOneBy({_id: id});
        if ( !list )
            throw ApiError.BadRequest(`List with id: ${id} is not exist`);

        const type = await TypeService.findOneBy({_id: typeId});
        if ( !type )
            throw ApiError.BadRequest(`Type with id: ${typeId} is not exist`);

        list.typeId = typeId;
        list.title = title ? title : list.title;
        list.checked = typeof checked !== "undefined" ? checked : list.checked;
        await list.save();

        return {
            id: list._id,
            title: list.title,
            checked: list.checked,
            type: {
                typeId: type._id,
                name: type.name
            }
        };
    }

    async delete(id) {
        return await List.findOneAndDelete({_id: id});
    }

    async getAll(typeId) {
        return await this.findManyBy({typeId});
    }

    async findOneBy(filter = {}) {
        return await List.findOne(filter);
    }

    async findManyBy(filter = {}) {
        return await List.find(filter);
    }
}

module.exports = new ListService;