var crypto = require("crypto");
module.exports = {
    generateRadomString(){
        return crypto.randomBytes(20).toString('hex');
    }
}