var crypto = require("crypto");
module.exports = {
    generateRadomString(n){
        return crypto.randomBytes(n).toString('hex');;
    }
}