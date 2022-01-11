const ApiError = require('../exceptions/ApiError');

module.exports = function (err, req, res, next) {
    if (err instanceof ApiError)
       return res.status(err.status).json({errors: {...err}});
    return res.send(500).json({message: err.message});
};