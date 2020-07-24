const crypto = require('crypto');

module.exports = function generateUniqueLicensePlate() {
    var str = crypto.randomBytes(4).toString('HEX');
    return str.substr(1);
}