class UserDto {
    id;
    email;
    isActivated;

    constructor(user) {
        this.id = user._id;
        this.email = user.email;
        this.isActivated = user.isActivated;
    }
}

module.exports = UserDto;