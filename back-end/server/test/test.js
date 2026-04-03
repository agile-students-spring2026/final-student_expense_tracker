import { expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

chai.use(chaiHttp);

describe("Expense Tracker API", function () {
    it("GET /api/expenses should return an array", async function() {
        const res = await chai.request(app).get("/api/expenses");
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
    });

    it("POST /api/expenses should create a new expense", async function() {
        const newExpense = {
            name:"Headphones",
            amount:"250",
            category:"Tech",
            details:"Useful for studying sessions",
            dateAdded:"4/2/2026"
        }
        const res = await chai.request(app)
            .post("/api/expenses")
            .send(newExpense);
        expect(res).to.have.status(201);
        expect(res.body).to.have.property("id");
        expect(res.body.name).to.equal("Headphones");
        expect(res.body.amount).to.equal("250");
    });

    it("PUT /api/expenses/:id should update an expense", async function() {
        const createRes = await chai.request(app)
            .post("/api/expenses")
            .send({
                name:"Hat",
                amount:"20",
                category:"Outfit",
                details:"Very stylish"
            });
            const expenseId = createRes.body.id;
            const updateRes = await chai.request(app)
                .put(`/api/expenses/${expenseId}`)
                .send({
                    name:"Cap",
                    amount:"22",
                    category:"Outfit",
                    details:"Simple aesthetic"
                });


        expect(updateRes).to.have.status(200);
        expect(updateRes.body.name).to.equal("Cap");
        expect(updateRes.body.amount).to.equal("22");
    });

    it("DELETE /api/expenses/:id should delete an expense", async function() {
        const createRes = await chai.request(app)
            .post("/api/expenses")
            .send({
                name:"Toy",
                amount:"40",
                category:"",
                details:"Fun to use"
            });
            const expenseId = createRes.body.id;
            const deleteRes = await chai.request(app)
                .delete(`/api/expenses/${expenseId}`)

        expect(deleteRes).to.have.status(200);
        expect(deleteRes.body).to.have.property("message");
    });


    it("DELETE /api/categories/:categoryName should delete a category", async function() {
        await chai.request(app)
            .post("/api/expenses")
            .send({
                name:"Cake",
                amount:"35",
                category:"Dessert",
                details:"Yummy"
            });
        const res = await chai.request(app).delete("/api/categories/Dessert");
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("message");
    });
});