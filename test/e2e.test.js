const request = require("supertest");
const mongoose = require('mongoose');
const app = require('../app');
const { ENV } = require('../src/configs/config');
describe("Cache-API e2e test", () => {

    beforeAll(async () =>
        await mongoose.connect(
            ENV.DB_URL, {
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
            expect(typeof response.body.result === 'string').toBe(true);
            expect(response.body.result).toMatch('valueUpdated');
        });

        it('cache miss and gerenerate random hex string ', async () => {
            const testcase = "random"

            const response = await request(app).get(`/cache/${testcase}`);

            const isHex = (target) => new RegExp().test('/[0-9A-Fa-f]{6}/g');
            expect(response.statusCode).toBe(200);
            expect(response.body.desc).toBe("success");
            expect(typeof response.body.result === 'string').toBe(true);
            expect(isHex(response.body.result)).toBe(true);
        });
    });

    describe('Test DELETE requests', () => {
        it('delete  a cache with key ', async () => {
            const testcase = "test1"

            const response = await request(app).delete(`/cache/${testcase}`);

            expect(response.statusCode).toBe(200);
            expect(response.body.desc).toBe("success");
            expect(response.body.result.deletedCount).toBeGreaterThan(0);
        });
    });

    describe('Test DELETE requests', () => {
        it('delete  all keys ', async () => {
            const testcase = "test1"

            const getKeys = await request(app).get(`/cache/`);
            const response = await request(app).delete(`/cache/`);

            expect(response.statusCode).toBe(200);
            expect(response.body.desc).toBe("success");
            expect(response.body.result.deletedCount).toBe(getKeys.body.result.length);
        });
    });
});