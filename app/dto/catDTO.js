const DTO = require('./DTO');

class CatDTO extends DTO {
    constructor() {
        super();
    }

    toObject(cat) {    
        return {
            name: cat.name,
            age: cat.age,
            owner: cat.owner
        }
    }

    
}

module.exports = new CatDTO();