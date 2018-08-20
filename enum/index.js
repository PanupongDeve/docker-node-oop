const auth = require('./auth');
const promote = require('./promote');

const enumType = Object.assign(
    auth,
    promote
);

module.exports = enumType;