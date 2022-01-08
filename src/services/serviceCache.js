const CacheModel = require("../models/cache");
const tools = require("../utils/tools");
const serviceGeneric = require("./serviceGeneric");
const mongoose = require('mongoose');

const fileName = `controllers/serviceCache`;
const MAX_CACHE_SIZE = 5;
module.exports = {

    /**
    * Return a given key's value. If key is not exist then return random string value.
    * reset createdAt date when cache hit
    * @param {String} key 
    * @returns 
    */
    async getSingleCache(key) {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getSignleCache`,
            async () => {
                let result = {};

                const session = await mongoose.startSession();

                await session.withTransaction(async () => {
                    const cache = await CacheModel.findOne({ key });

                    if (cache) {
                        console.log("Cache hit");
                        result = cache.value;

                        // reseting cache TTL
                        cache.createdAt = new Date();
                        cache.save();
                    } else {

                        console.log("Cache miss");
                        result = tools.generateRadomString();
                        if (await this.getCacheSize() >= MAX_CACHE_SIZE) {

                            // apply FIFO
                            const firstCachItem = (await CacheModel.find({}).sort({ "_id": 1 }).limit(1))[0];

                            this.deleteSingleCache(firstCachItem.key);
                        }

                        await CacheModel.create({
                            key: key,
                            value: result
                        });
                    }
                });

                session.endSession();

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
     * Create/Update cache data by given key field.
     * If cache size limit reached then use FIFO as evict policy
     * @param {Object} cacheObject 
     * @returns 
     */
    async upsertSingleCache(cacheObject) {
        return await serviceGeneric.genericServiceMethod(`${fileName}/upsertSingleCache`,
            async () => {
                let result;

                const session = await mongoose.startSession();

                await session.withTransaction(async () => {
                    const cache = await CacheModel.findOne({ key: cacheObject.key });
                    if (cache) {
                        cache.value = cacheObject.value;
                        result = await cache.save();
                    } else {

                        if (await this.getCacheSize() >= MAX_CACHE_SIZE) {
                            // apply FIFO
                            const firstCachItem = (await CacheModel.find({}).sort({ "_id": 1 }).limit(1))[0];

                            this.deleteSingleCache(firstCachItem.key);
                        }

                        result = await CacheModel.create(cacheObject);
                    }
                });

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

    /**
    * Return cache counts in DB
    * @returns 
    */
    async getCacheSize() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getCacheSize`,
            async () => {
                return await CacheModel.estimatedDocumentCount();
            });
    }
};