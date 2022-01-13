const bcrypt = require('bcrypt');
const uuid = require('uuid');
const ApiError = require('../exceptions/ApiError');
const UserDto = require('../dtos/UserDto');
const TokenService = require('../services/TokenService');
const User = require('../models/userModel');

class UserService {
    async register(email, password) {
        const candidate = await this.findOneBy({email});
        if (candidate)
            throw ApiError.BadRequest(`User with email: ${email} already exist`);

        const hashedPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await User.create({email, password: hashedPassword, activationLink});
        await user.save();
        const data = new UserDto(user);
        return await this.generateTokens(data);
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if ( !user )
            throw ApiError.BadRequest(`Wrong email or password`);

        const passwordCheck = await bcrypt.compare(password, user.password);
        if ( !passwordCheck )
            throw ApiError.BadRequest(`Wrong email or password`);

        const data = new UserDto(user);
        return await this.generateTokens(data);
    }

    async logout (refreshToken) {
        return await TokenService.deleteOne(refreshToken);
    }

    async refresh(refreshToken) {
        const token = await TokenService.findOne({refreshToken});
        const userData = TokenService.validateRefreshToken(refreshToken);

        if (!refreshToken || !token || !userData)
            throw ApiError.UnauthorizedRequest();

        return await this.generateTokens(userData)
    }

    async findOneBy(filter = {}) {
        return await User.findOne(filter);
    }

    async generateTokens(user) {
        const tokens = await TokenService.generateTokens({...user});
        await TokenService.create(user.id, tokens.refreshToken);
        return {
            ...user,
            ...tokens,
        }
    }
}

module.exports = new UserService();