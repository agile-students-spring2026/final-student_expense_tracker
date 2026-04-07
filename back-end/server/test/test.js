import { expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

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

// ===== Auth Tests =====

describe("Auth API", function () {
    it("POST /api/logout should logout successfully", async function () {
        const res = await chai.request(app).post("/api/logout");
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
        expect(res.body.message).to.equal("Logout successful");
    });
});
