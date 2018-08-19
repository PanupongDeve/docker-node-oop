const express = require('express')
const router = express.Router()
const ApiResponse = require('../helper/ApiResponse');
const model = require('../database/mysql').model;

class CatsController {
    constructor() {
        this.router = router;
        this.router.get('/', this.get);
        this.router.get('/:id', this.getById);
        this.router.post('/create', this.post);
        this.router.patch('/:id', this.update);
        this.router.delete('/:id', this.delete);
    }

    async get(req, res) {
        const cats = await model.cats.findAll();
        ApiResponse.success(cats)(res);
    }

    async getById(req, res) {
        
        res.send(`You finding cat number ${req.params.id}`);
    }

    async post(req, res) {
        res.send('You create cat');
    }

    async update(req, res) {
        res.send(`you update cat number ${req.params.id}`);
    }

    async delete(req, res) {
        res.send(`you delete cat number ${req.params.id}`)
    }
}

module.exports = new CatsController().router;