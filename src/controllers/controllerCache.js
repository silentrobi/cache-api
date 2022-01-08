const serviceCache = require('../services/serviceCache');
const controllerGeneric = require('./controllerGeneric');

const fileName = `controllers/controllerCache`;

module.exports = {
    async getOne(req, res, next) {
        return controllerGeneric.genericControllerMethod(
            `${fileName}/getOne`,
            200, res, next,
            async () => await serviceCache.getSignleCache(req.params)
        );
    },
    async getKeys(req, res, next) {
        return controllerGeneric.genericControllerMethod(
            `${fileName}/getKeys`,
            200, res, next,
            async () => await serviceCache.getCacheKeys()
        );
    },
    async upsert(req, res, next) {
        return controllerGeneric.genericControllerMethod(
            `${fileName}/upsert`,
            200, res, next,
            async () => await serviceCache.upsertSingleCache(req.body)
        );
    },
    async deleteOne(req, res, next) {
        return controllerGeneric.genericControllerMethod(
            `${fileName}/deleteOne`,
            200, res, next,
            async () => await serviceCache.deleteSingleCache(req.params.key)
        );
    },
    async deleteAll(req, res, next) {
        return controllerGeneric.genericControllerMethod(
            `${fileName}/deleteAll`,
            200, res, next,
            async () => await serviceCache.deleteAllCache()
        );
    }
};
