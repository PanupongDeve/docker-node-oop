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
    }

    async home(req, res) {
        ApiResponse.success("YOU ARE CONNECT SERVER AND MONGDB ......")(res);
    }

 
}

module.exports = new HomeController().router;