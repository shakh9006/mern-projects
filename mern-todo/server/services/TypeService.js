const ApiError = require('../exceptions/ApiError');
const Type = require('../models/typeModel');
const ColorService = require('./ColorService');

class TypeService {
    async create(name, colorId) {
        const color = await ColorService.findOneBy({_id: colorId});
        if ( !color )
            throw ApiError.BadRequest(`Color with id: ${colorId} is not exist`);

        const type = await Type.create({name, colorId});
        await type.save();

        return {
            id: type._id,
            name: type.name,
            color: color.name
        };
    }

    async update(id, name, colorId) {
        const type = await this.findOneBy({_id: id});
        if ( !type )
            throw ApiError.BadRequest(`Type with id: ${id} is not exist`);

        colorId = colorId ? colorId : type.colorId;
        const color = await ColorService.findOneBy({_id: colorId});
        if ( !color )
            throw ApiError.BadRequest(`Color with id: ${colorId} is not exist`);

        type.name = name ? name : type.name;
        type.colorId = colorId;
        await type.save();
        return {
            id: type._id,
            name: type.name,
            color: type.colorId
        };
    }

    async delete(id) {
        return await Type.findOneAndDelete({_id: id});
    }

    async getAll() {
        return await Type.find({});
    }

    async findOneBy(filter = {}) {
        return await Type.findOne(filter);
    }
}

module.exports = new TypeService;