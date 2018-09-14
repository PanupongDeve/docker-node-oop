const express = require('express')
const router = express.Router()
const ApiResponse = require('../../helper/ApiResponse');
const enumTypes = require('../../enum');
const Middlewares = require('../../middlewares');
const UserDTO = require('../../dto/UserDTO');

class HomeController {
    constructor() {
        this.router = router;
        this.router.get('/', this.home);
        this.router.get('/enumTypes', this.enum);
        this.router.get('/me', Middlewares.verifyToken,this.getProfileFormToken);
    }

    async home(req, res) {
        ApiResponse.success("Api running .....")(res);
    }

    async enum(req, res) {
        ApiResponse.success(enumTypes)(res);
    }

    async getProfileFormToken(req, res) {
        const user = new UserDTO(req.profile).toObject();
        ApiResponse.success(user)(res);       
    }
}

module.exports = new HomeController().router;