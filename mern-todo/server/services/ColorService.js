const ApiError = require('../exceptions/ApiError');
const Color = require('../models/colorModel');

class ColorService {
    async create(name, color) {
        const colorFromDb = await Color.findOne({color}); // get color from db by color
        if ( colorFromDb ) // if color exist break and send error
            throw ApiError.BadRequest(`Color with ${color} already exist`);
        const newColor = await Color.create({name, color}); // if color now exist than create new color and save
        return await newColor.save();
    }

    async update(colorId, name, color) {
        const colorFromDb = await Color.find({_id: colorId}); // get color from db
        if (!colorFromDb) // if not exist break and send error
            throw ApiError.BadRequest(`Color with id ${colorId} is not exist`);
        return await Color.findOneAndUpdate({_id: colorId}, { // find and set new values in db by color id
            name: name ? name : colorFromDb.name,
            color: color ? color : colorFromDb.color
        });
    }

    async delete(colorId) {
        const colorFromDb = await Color.find({_id: colorId}); // get color from db
        if (!colorFromDb) // if not exist break and send error
            throw ApiError.BadRequest(`Color with id ${colorId} is not exist`);

        return await Color.findOneAndDelete({_id: colorId}); // delete by color id
    }

    async getColorList() {
        return await Color.find({}); // get all color list
    }

    async findOneBy(filter = {}) {
        return await Color.findOne(filter);
    }
}

module.exports = new ColorService;