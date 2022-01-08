const CacheModel = require("../models/cache");
const serviceGeneric = require("./serviceGeneric");

const fileName = `controllers/serviceHello`;

module.exports = {
    async getSignleCache(key) {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getSignleCache`,
            async () => {
                return "Hello! I am robi";
            });
    },
    async getCacheKeys() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getCacheKeys`,
            async () => {
                return "Hello! I am robi";
            });
    },

    /**
     * Create/Update cache data by given key field
     * @param {Object} cacheObject 
     * @returns 
     */
    async upsertSingleCache(cacheObject) {
        return await serviceGeneric.genericServiceMethod(`${fileName}/upsertSingleCache`,
            async () => {
                let result;
                const cache = await CacheModel.findOne({ key: cacheObject.key });
                if (cache) {
                    cache.value = cacheObject.value;
                    result = await cache.save();
                } else {
                    result = await CacheModel.create(cacheObject);
                }

                return result;
            });
    },
    async deleteSingleCache(key) {
        return await serviceGeneric.genericServiceMethod(`${fileName}/deleteSingleCache`,
            async () => {
                return await CacheModel.deleteOne({ key });
            });
    },
    async deleteAllCache() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/deleteAllCache`,
            async () => {
                return await CacheModel.deleteMany({});
            });
    },
};
