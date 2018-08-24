const express = require('express')
const router = express.Router()
const ApiResponse = require('../helper/ApiResponse');
const modelPromise = require('../database/mysql').model;

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
        const model = await Promise.resolve(modelPromise);   
        const cats = await model.cat.findAll();
        ApiResponse.success(cats)(res);
    }

    async getById(req, res) {
        const model = await Promise.resolve(modelPromise);
        const cat = await model.cat.findById(req.params.id);
        ApiResponse.success(cat)(res);
    }

    async post(req, res) {
        const model = await Promise.resolve(modelPromise);  
        const cat = await model.cat.create(req.body);
        ApiResponse.success(cat)(res);
    }

    async update(req, res) {
        const model = await Promise.resolve(modelPromise);  
        const id = req.params.id;
        let cat = await model.cat.findById(id);
        cat = await cat.updateAttributes(req.body);
        ApiResponse.success(cat)(res);
    }

    async delete(req, res) {
        res.send(`you delete cat number ${req.params.id}`)
    }
}

module.exports = new CatsController().router;