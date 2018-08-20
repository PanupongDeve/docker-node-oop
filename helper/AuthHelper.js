const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class AuthHelper {
    constructor() {
        this.saltRounds = 10;
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, this.saltRounds);
    }

    verifyPassword() {

    }

    generateToken(data) {
        let token = jwt.sign(data, 'IloveGod');
        token = `Bearer ${token}`;
        return token;
    }

    getDataFromToken() {

    }
}

module.exports = new AuthHelper();