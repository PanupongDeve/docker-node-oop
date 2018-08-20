const express = require('express')
const router = express.Router()
const ApiResponse = require('../helper/ApiResponse');
const enumTypes = require('../enum');

class HomeController {
    constructor() {
        this.router = router;
        this.router.get('/', this.home);
        this.router.get('/enumTypes', this.enum);
    }

    async home(req, res) {
        ApiResponse.success("Api running .....")(res);
    }

    async enum(req, res) {
        ApiResponse.success(enumTypes)(res);
    }
}

module.exports = new HomeController().router;