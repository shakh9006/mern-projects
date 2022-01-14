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
        return await this.generateTokens(user);
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if ( !user )
            throw ApiError.BadRequest(`Wrong email or password`);

        const passwordCheck = await bcrypt.compare(password, user.password);
        if ( !passwordCheck )
            throw ApiError.BadRequest(`Wrong email or password`);

        return await this.generateTokens(user);
    }

    async logout (refreshToken) {
        return await TokenService.deleteOne(refreshToken);
    }

    async refresh(refreshToken) {
        const token = await TokenService.findOne({refreshToken});
        const userData = TokenService.validateRefreshToken(refreshToken);

        if (!refreshToken || !token || !userData)
            throw ApiError.UnauthorizedRequest();

        const user = await this.findOneBy({email: userData.email});
        return await this.generateTokens(user);
    }

    async activate(activationLink) {
        const user = await this.findOneBy({activationLink});
        if (user) {
            user.isActivated = true;
            await user.save();
            return `${process.env.CLIENT_APP_URI}/`
        }
        return `${process.env.CLIENT_APP_URI}/404`;
    }

    async findOneBy(filter = {}) {
        return await User.findOne(filter);
    }

    async generateTokens(data) {
        const user = new UserDto(data);
        const tokens = await TokenService.generateTokens({...user});
        await TokenService.create(user.id, tokens.refreshToken);
        return {
            ...user,
            ...tokens,
        }
    }
}

module.exports = new UserService();