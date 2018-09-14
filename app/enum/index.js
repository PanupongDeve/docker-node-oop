const auth = require('./auth');
const promote = require('./promote');
const statusDB = require('./statusDB');

const enumType = Object.assign(
    auth,
    promote,
    statusDB
);

module.exports = enumType;