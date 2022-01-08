const mongoose = require("mongoose");

const CacheSchema = new mongoose.Schema({
    key: String,
    value: {
        type: Object,
        required: true
    },

}, { timestamps: true });


const CacheModel = mongoose.model("Cache", CacheSchema);

module.exports = CacheModel;