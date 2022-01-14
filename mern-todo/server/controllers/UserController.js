const UserService = require('../services/UserService');

class UserController {
    async register(req, res, next) {
        try {
            const {email, password} = req.body;
            const data = await UserService.register(email, password);
            res.cookie('refreshToken', data.refreshToken, {httpOny: true, maxAge: 60 * 60 * 24 * 1000 * 30});
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const data = await UserService.login(email, password);
            res.cookie('refreshToken', data.refreshToken,  {httpOny: true, maxAge: 60 * 60 * 24 * 1000 * 30});
            res.send(data);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const data = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.send(data)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const data = await UserService.refresh(refreshToken);
            res.cookie('refreshToken', data.refreshToken,  {httpOny: true, maxAge: 60 * 60 * 24 * 1000 * 30});
            res.send(data)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const {link} = req.params;
            const redirectLink = await UserService.activate(link);
            res.redirect(redirectLink);
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController;