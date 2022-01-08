const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: 0,
    },
    data: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});


const User = mongoose.model("User", UserSchema);

module.exports = User;