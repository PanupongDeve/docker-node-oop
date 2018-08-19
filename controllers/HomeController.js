const express = require('express')
const router = express.Router()
const ApiResponse = require('../helper/ApiResponse');


class HomeController {
    constructor() {
        this.router = router;
        this.router.get('/', this.home);
    }

    async home(req, res) {
        ApiResponse.success("Api running .....")(res);
    }
}

module.exports = new HomeController().router;