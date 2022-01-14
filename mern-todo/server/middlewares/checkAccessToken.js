const ApiError = require('../exceptions/ApiError');
const TokenService = require('../services/TokenService');

module.exports = function (req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if ( !authorizationHeader )
        return next(ApiError.UnauthorizedRequest())

    const accessToken = authorizationHeader.split(' ')[1];
    if ( !accessToken )
        return next(ApiError.UnauthorizedRequest())

    const validationData = TokenService.validateAccessToken(accessToken);
    if ( !validationData )
        return next(ApiError.UnauthorizedRequest())

    req.user = validationData;
    next();
}