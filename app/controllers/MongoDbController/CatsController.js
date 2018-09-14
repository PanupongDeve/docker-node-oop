
const express = require('express')
const router = express.Router()
const model = require('../../database/mongoDB').model;
const CatDTO = require('../../dto/catDTO');
const ApiResponse = require('../../helper/ApiResponse');
const enumTypes = require('../../enum');

class CatsController {
    constructor() {
        this.router = router;
        this.router.get('/', this.get);
        this.router.get('/:id', this.getById);
        this.router.post('/create', this.post);
        this.router.patch('/:id/edit', this.update);
        this.router.delete('/:id/delete', this.delete);
    }

    async get(req, res) {
        try {
            const catsData = await model.cat.find({ status: enumTypes.statusDB.ACTIVE });
            let cats = catsData.map(catData => {
                let cat = CatDTO.sendDataToClient(catData);
                return cat;
            });
            ApiResponse.success(cats)(res);
        } catch (error) {
            ApiResponse.error(error.message);
        }
        
    }

    async getById(req, res) {
      try {
          const { id } = req.params;
          let catData = await model.cat.findOne({ _id: id, status: enumTypes.statusDB.ACTIVE });
          let cat = CatDTO.sendDataToClient(catData, id);
          ApiResponse.success(cat)(res);
          
      } catch (error) {
          ApiResponse.error(error.message);
      }
    }

    async post(req, res) {
        try {
            const cat = CatDTO.sendDtaToSaveDatabase(req.body);
            await model.cat.create(cat);
            ApiResponse.success()(res);  
        } catch (error) {
            ApiResponse.error(error.message);
        }
      

    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const oldCat = await model.cat.findOne({ _id: id, status: enumTypes.statusDB.ACTIVE });
            let newCat = Object.assign(oldCat, req.body);
            newCat = CatDTO.preventUpdateDatabase(newCat)
            newCat.save();
            ApiResponse.success()(res);
        } catch (error) {
            ApiResponse.error(error.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            let deletedCat = await model.cat.findOne({ _id: id, status: enumTypes.statusDB.ACTIVE });
            deletedCat = CatDTO.preventRemoveDatabase(deletedCat)
            deletedCat.save();
            ApiResponse.success()(res);
        } catch (error) {
            ApiResponse.error(error.message);
        }
    }
}

module.exports = new CatsController().router;