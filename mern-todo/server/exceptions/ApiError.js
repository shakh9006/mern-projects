class ApiError {
    status;
    message;
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }

    static ServerError(message) {
        return new ApiError(500, message);
    }

    static UnauthorizedRequest(message = 'Permission denied') {
        return new ApiError(401, message);
    }
}

module.exports = ApiError;