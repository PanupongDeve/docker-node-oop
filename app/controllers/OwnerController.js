const express = require('express')
const router = express.Router()
const ApiResponse = require('../helper/ApiResponse');
const modelPromise = require('../database/mysql').model;

class OwnersController {
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
        const owners = await model.owner.findAll({
            include: [model.cat]
        });
        ApiResponse.success(owners)(res);
    }

    async getById(req, res) {
        const model = await Promise.resolve(modelPromise);
        const owner = await model.owner.findById(req.params.id, {
            include: [model.cat]
        });
        ApiResponse.success(owner)(res);
    }

    async post(req, res) {
        const model = await Promise.resolve(modelPromise);  
        const owner = await model.owner.create(req.body);
        ApiResponse.success(owner)(res);
    }

    async update(req, res) {
        const model = await Promise.resolve(modelPromise);  
        const id = req.params.id;
        let owner = await model.owner.findById(id);
        owner = await owner.updateAttributes(req.body, {
            include: [model.cat]
        });
        ApiResponse.success(owner)(res);
    }

    async delete(req, res) {
        res.send(`you delete owner number ${req.params.id}`)
    }
}

module.exports = new OwnersController().router;