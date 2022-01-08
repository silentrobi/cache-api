const { assert } = require("joi");
const { postHello } = require("../controllers/controllerHello");
const serviceGeneric = require("./serviceGeneric");

const fileName = `controllers/serviceHello`;

module.exports = {
    async getHello() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getHello`, async () => {
            return "Hello! I am robi";
        });
    },
    async getHelloError() {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getHello`, async () => {
            throw Error("get hello error");
        });
    },
    async postHello(postObj) {
        return await serviceGeneric.genericServiceMethod(`${fileName}/getHello`, async () => {
            console.log(postObj.message);
        });
    }
};
