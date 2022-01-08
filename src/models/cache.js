const mongoose = require("mongoose");

const DEFAULT_EXPIRE_TIME = 15;
const CacheSchema = new mongoose.Schema({
    key: String,
    value: {
        type: Object,
        required: true
    },

}, { timestamps: true });

CacheSchema.index({ createdAt: 1 }, { expireAfterSeconds: DEFAULT_EXPIRE_TIME });

const CacheModel = mongoose.model("Cache", CacheSchema);

module.exports = CacheModel;