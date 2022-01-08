const request = require("supertest");
const mongoose = require('mongoose');
const app = require('../app');

describe("Cache-API e2e test", () => {

    beforeAll(async () =>
        await mongoose.connect(
            "mongodb+srv://admin:12345@cluster0.9aczl.mongodb.net/Cache", {
            useNewUrlParser: false
        })
    );

    afterAll(() => {
        mongoose.connection.close();
    });
    describe("Test POST requests", () => {
        it('Create a cache', async () => {
            const cacheBody = {
                key: "test1",
                value: "value1"
            }

            const response = await request(app).post("/cache/").send(cacheBody);

            expect(response.statusCode).toBe(200);
            expect(response.body.desc).toBe("success");
            expect(response.body.result.value).toMatch(cacheBody.value);
        });

        it('Update a cache', async () => {
            const cacheBody = {
                key: "test1",
                value: "valueUpdated"
            }

            const response = await request(app).post("/cache/").send(cacheBody);

            expect(response.statusCode).toBe(200);
            expect(response.body.desc).toBe("success");
            expect(response.body.result.value).toMatch(cacheBody.value);
        });
    });


    describe("Test GET requests", () => {
        it('get cache key list', async () => {
            const response = await request(app).get("/cache/");

            expect(response.statusCode).toBe(200);
            expect(response.body.desc).toBe("success");
            expect(Array.isArray(response.body.result)).toBe(true);
            expect(response.body.result.length).toBeGreaterThan(0);
        });

        it('get a cache from database', async () => {
            const testcase = "test1"

            const response = await request(app).get(`/cache/${testcase}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.desc).toBe("success");
            expect(typeof response.body.result  === 'string').toBe(true);
            expect(response.body.result).toMatch('valueUpdated');
        });
    });

});