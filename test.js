require("dotenv").config();
const request = require("supertest");
const app = require("./src/app");

// const generateToken = require("./src/utils/generateToken");

// const token = generateToken({ id: "1", role: "user" });
// console.log(token);

describe("Health API", () => {

    test("Should return server health status", async () => {
        const response = await request(app).get("/health");
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({
            status: "healthy"
        });
    });

});
