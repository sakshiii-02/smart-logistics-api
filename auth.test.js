
const request = require("supertest");
const app = require("./src/app");

describe("Authentication API", () => {

    const testUser = {
        username: "Test User",
        email: `test${Date.now()}@example.com`,
        password: "Test@12345",
        role: "admin"
    };

    test("Should register a new user", async () => {
        const response = await request(app)
            .post("/api/auth/registerUser")
            .send(testUser);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty("token");
        expect(response.body.message).toBe("User registered successfully");
    });

});
