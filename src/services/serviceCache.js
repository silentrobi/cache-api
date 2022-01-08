const { assert } = require("joi");
const { postHello } = require("../controllers/controllerHello");
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
    async upsertSingleCache() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/upsertSingleCache`, 
        async () => {
            return "Hello! I am robi";
        });
    },
    async deleteSingleCache() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/deleteSingleCache`, 
        async () => {
            return "Hello! I am robi";
        });
    },
    async deleteAllCache() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/deleteAllCache`, 
        async () => {
            return "Hello! I am robi";
        });
    },
};
