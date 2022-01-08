const CacheModel = require("../models/cache");
const tools = require("../utils/tools");
const serviceGeneric = require("./serviceGeneric");

const fileName = `controllers/serviceHello`;

module.exports = {

    /**
    * Return a given key's value. If key is not exist then return random string value.
    * @param {String} key 
    * @returns 
    */
    async getSignleCache(key) {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getSignleCache`,
            async () => {
                let result = {};
                const cache = await CacheModel.findOne({ key });

                if (cache) {
                    console.log("Cache hit");
                    result = cache.value;
                } else {
                    console.log("Cache miss");
                    result = tools.generateRadomString(30);

                    await CacheModel.create({
                        key: key,
                        value: result
                    });
                }

                return result;
            });
    },

    /**
     * Return all stored cache keys
     * @returns 
     */
    async getCacheKeys() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getCacheKeys`,
            async () => {
                let result = [];
                const keys = await CacheModel.find({}).select("key");

                if (keys.length > 0) {
                    result = keys.map((item) => item.key);
                }

                return result;
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

    /**
    * Delete a cache data by given key
    * @param {String} key 
    * @returns 
    */
    async deleteSingleCache(key) {
        return await serviceGeneric.genericServiceMethod(`${fileName}/deleteSingleCache`,
            async () => {
                return await CacheModel.deleteOne({ key });
            });
    },

    /**
    * Delete all cache data
    * @returns 
    */
    async deleteAllCache() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/deleteAllCache`,
            async () => {
                return await CacheModel.deleteMany({});
            });
    },
};
