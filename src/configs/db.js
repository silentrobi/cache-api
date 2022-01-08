
const mongoose = require('mongoose');
module.exports = {
     async connect() {
        try {
           await mongoose.connect("mongodb://admin:12345@mongo:27017/", { useNewUrlParser: true });
            console.log("Db connection is successful!");
        } catch (err) {
            console.log(err);
            console.log('Db Connection failed!')
        }
    }
}