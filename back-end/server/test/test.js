import { expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

// ===== Auth Tests =====

describe("Auth API", function () {

    // Signup Tests

    it("POST /api/signup should create a new user", async function () {
        const res = await chai.request(app)
            .post("/api/signup")
            .send({ name: "John Doe", email: "john@example.com", password: "123456", confirm: "123456" });
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("message", "User created.");
        expect(res.body).to.have.property("userId");
        expect(res.body).to.have.property("name", "John Doe");
    });

    it("POST /api/signup should fail if any field is missing", async function () {
        const res = await chai.request(app)
            .post("/api/signup")
            .send({ name: "Jane", email: "", password: "123456", confirm: "123456" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error", "All fields are required.");
    });

    it("POST /api/signup should fail if passwords do not match", async function () {
        const res = await chai.request(app)
            .post("/api/signup")
            .send({ name: "Jane", email: "jane@example.com", password: "123456", confirm: "654321" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error", "Passwords do not match.");
    });

    it("POST /api/signup should fail if password is too short", async function () {
        const res = await chai.request(app)
            .post("/api/signup")
            .send({ name: "Jane", email: "jane2@example.com", password: "123", confirm: "123" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error", "Password must be at least 6 characters.");
    });

    it("POST /api/signup should fail if email already exists", async function () {
        await chai.request(app)
            .post("/api/signup")
            .send({ name: "Existing", email: "existing@example.com", password: "123456", confirm: "123456" });

        const res = await chai.request(app)
            .post("/api/signup")
            .send({ name: "Existing", email: "existing@example.com", password: "123456", confirm: "123456" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error", "User already exists.");
    });

    // Login Tests

    it("POST /api/login should login successfully with correct credentials", async function () {
        await chai.request(app)
            .post("/api/signup")
            .send({ name: "Login User", email: "login@example.com", password: "abcdef", confirm: "abcdef" });

        const res = await chai.request(app)
            .post("/api/login")
            .send({ email: "login@example.com", password: "abcdef" });
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Login successful.");
        expect(res.body).to.have.property("userId");
        expect(res.body).to.have.property("name", "Login User");
    });

    it("POST /api/login should fail with wrong password", async function () {
        const res = await chai.request(app)
            .post("/api/login")
            .send({ email: "login@example.com", password: "wrongpass" });
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("error", "Invalid credentials.");
    });

    it("POST /api/login should fail if email does not exist", async function () {
        const res = await chai.request(app)
            .post("/api/login")
            .send({ email: "nobody@example.com", password: "123456" });
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("error", "Invalid credentials.");
    });

    it("POST /api/login should fail if fields are missing", async function () {
        const res = await chai.request(app)
            .post("/api/login")
            .send({ email: "", password: "" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error", "Email and password are required.");
    });

    it("POST /api/logout should logout successfully", async function () {
        const res = await chai.request(app).post("/api/logout");
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Logout successful");
    });
});

// ===== Expense Tests =====

describe("Expense API", function () {
    it("GET /api/expenses should return an array", async function () {
        const res = await chai.request(app).get("/api/expenses");
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
    });

    it("POST /api/expenses should create a new expense", async function () {
        const res = await chai.request(app)
            .post("/api/expenses")
            .send({ name: "Headphones", amount: "250", category: "Tech", details: "Useful for studying", dateAdded: "4/2/2026" });
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("id");
        expect(res.body.name).to.equal("Headphones");
        expect(res.body.amount).to.equal("250");
    });

    it("POST /api/expenses should return 400 if name is missing", async function () {
        const res = await chai.request(app)
            .post("/api/expenses")
            .send({ amount: "10", category: "Food" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
    });

    it("POST /api/expenses should return 400 if amount is missing", async function () {
        const res = await chai.request(app)
            .post("/api/expenses")
            .send({ name: "Coffee", category: "Food" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
    });

    it("POST /api/expenses should return 400 if amount is not a number", async function () {
        const res = await chai.request(app)
            .post("/api/expenses")
            .send({ name: "Coffee", amount: "abc", category: "Food" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
    });

    it("PUT /api/expenses/:id should update an expense", async function () {
        const createRes = await chai.request(app)
            .post("/api/expenses")
            .send({ name: "Hat", amount: "20", category: "Outfit", details: "Very stylish" });
        const expenseId = createRes.body.id;

        const updateRes = await chai.request(app)
            .put(`/api/expenses/${expenseId}`)
            .send({ name: "Cap", amount: "22", category: "Outfit", details: "Simple aesthetic" });
        expect(updateRes).to.have.status(200);
        expect(updateRes.body.name).to.equal("Cap");
        expect(updateRes.body.amount).to.equal("22");
    });

    it("PUT /api/expenses/:id should return 404 if expense does not exist", async function () {
        const res = await chai.request(app)
            .put("/api/expenses/999999999")
            .send({ name: "Ghost" });
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error");
    });

    it("PUT /api/expenses/:id should return 400 if updated amount is not a number", async function () {
        const createRes = await chai.request(app)
            .post("/api/expenses")
            .send({ name: "Shoes", amount: "80", category: "Clothing" });
        const expenseId = createRes.body.id;

        const res = await chai.request(app)
            .put(`/api/expenses/${expenseId}`)
            .send({ amount: "not-a-number" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
    });

    it("DELETE /api/expenses/:id should delete an expense", async function () {
        const createRes = await chai.request(app)
            .post("/api/expenses")
            .send({ name: "Toy", amount: "40", category: "", details: "Fun to use" });
        const expenseId = createRes.body.id;

        const deleteRes = await chai.request(app).delete(`/api/expenses/${expenseId}`);
        expect(deleteRes).to.have.status(200);
        expect(deleteRes.body).to.have.property("message");
    });

    it("DELETE /api/categories/:categoryName should delete all expenses in a category", async function () {
        await chai.request(app)
            .post("/api/expenses")
            .send({ name: "Cake", amount: "35", category: "Dessert", details: "Yummy" });
        const res = await chai.request(app).delete("/api/categories/Dessert");
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
    });
});

// ===== Budget Tests =====

describe("Budget API", function () {
    it("GET /api/budget should return the budget object", async function () {
        const res = await chai.request(app).get("/api/budget");
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("incomeSources");
        expect(res.body).to.have.property("fixedExpenses");
        expect(res.body).to.have.property("period");
    });

    it("POST /api/budget should create a budget", async function () {
        const res = await chai.request(app)
            .post("/api/budget")
            .send({
                incomeSources: [{ name: "Job", amount: "500" }],
                fixedExpenses: [{ name: "Rent", amount: "300" }],
                period: "Monthly"
            });
        expect(res).to.have.status(201);
        expect(res.body.incomeSources).to.deep.equal([{ name: "Job", amount: "500" }]);
        expect(res.body.fixedExpenses).to.deep.equal([{ name: "Rent", amount: "300" }]);
        expect(res.body.period).to.equal("Monthly");
    });

    it("POST /api/budget should return 400 for invalid period", async function () {
        const res = await chai.request(app)
            .post("/api/budget")
            .send({ incomeSources: [], fixedExpenses: [], period: "Daily" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
    });

    it("POST /api/budget should return 400 if incomeSources is not an array", async function () {
        const res = await chai.request(app)
            .post("/api/budget")
            .send({ incomeSources: "not-an-array", fixedExpenses: [] });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
    });

    it("PUT /api/budget should update budget fields", async function () {
        await chai.request(app)
            .post("/api/budget")
            .send({ incomeSources: [{ name: "Job", amount: "500" }], fixedExpenses: [], period: "Monthly" });

        const res = await chai.request(app)
            .put("/api/budget")
            .send({ period: "Weekly" });
        expect(res).to.have.status(200);
        expect(res.body.period).to.equal("Weekly");
        expect(res.body.incomeSources).to.deep.equal([{ name: "Job", amount: "500" }]);
    });

    it("PUT /api/budget should return 400 for invalid period", async function () {
        const res = await chai.request(app)
            .put("/api/budget")
            .send({ period: "Hourly" });
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
    });

    it("DELETE /api/budget should reset the budget", async function () {
        const res = await chai.request(app).delete("/api/budget");
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");

        const getRes = await chai.request(app).get("/api/budget");
        expect(getRes.body.incomeSources).to.deep.equal([]);
        expect(getRes.body.fixedExpenses).to.deep.equal([]);
        expect(getRes.body.period).to.equal("Monthly");
    });
});



// ===== Profile Tests =====

describe("Profile API", function () {
    it("GET /api/profile/:id should return a user's profile", async function () {
        const signupRes = await chai.request(app)
            .post("/api/signup")
            .send({
                name: "Profile User",
                email: "profile@example.com",
                password: "123456",
                confirm: "123456"
            });

        const userId = signupRes.body.userId;

        const res = await chai.request(app).get(`/api/profile/${userId}`);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("id", userId);
        expect(res.body).to.have.property("name", "Profile User");
        expect(res.body).to.have.property("email", "profile@example.com");
    });

    it("GET /api/profile/:id should return 404 if user does not exist", async function () {
        const res = await chai.request(app).get("/api/profile/999999999");
        expect(res).to.have.status(404);
        expect(res.body).to.have.property("error", "User not found.");
    });

    it("PUT /api/profile/:id should update a user's profile", async function () {
        const signupRes = await chai.request(app)
            .post("/api/signup")
            .send({
                name: "Old Name",
                email: "oldprofile@example.com",
                password: "123456",
                confirm: "123456"
            });

        const userId = signupRes.body.userId;

        const res = await chai.request(app)
            .put(`/api/profile/${userId}`)
            .send({
                name: "New Name",
                email: "newprofile@example.com"
            });

        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message", "Profile updated.");
        expect(res.body.user).to.have.property("id", userId);
        expect(res.body.user).to.have.property("name", "New Name");
        expect(res.body.user).to.have.property("email", "newprofile@example.com");
    });

    it("PUT /api/profile/:id should return 400 if fields are missing", async function () {
        const signupRes = await chai.request(app)
            .post("/api/signup")
            .send({
                name: "Another User",
                email: "anotherprofile@example.com",
                password: "123456",
                confirm: "123456"
            });

        const userId = signupRes.body.userId;

        const res = await chai.request(app)
            .put(`/api/profile/${userId}`)
            .send({
                name: "",
                email: ""
            });

        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error", "Name and email are required.");
    });
});