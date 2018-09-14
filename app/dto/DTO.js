const enumType = require('../enum');
const { statusDB }  = enumType;

class DTO {
    constructor() {
        this.statusDB = statusDB;
    }

    preventSaveDatabase(object) {
        object.status = statusDB.ACTIVE;
        return object;
    }

    preventUpdateDatabase(object) {
        object.status = statusDB.ACTIVE;
        return object
    }

    preventRemoveDatabase(object) {
        object.status = statusDB.DELETED;
        return object
    }

    preventToClient(object) {
        const newObject = {};
        newObject.id = object.id || object._id;
        return newObject;
    }

    sendDataToClient(object, id) {
        if(!object) return { cat: `does not exist at objectId: ${id}`};
        return Object.assign(this.toObject(object), this.preventToClient(object));
    }

    sendDtaToSaveDatabase(object) {
        return Object.assign(this.toObject(object), this.preventSaveDatabase(object))
    }


    

}

module.exports = DTO;