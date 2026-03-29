import { Link } from "react-router-dom"
import ExpenseTable from "../components/ExpenseTable"
import CategoryExpenseTable from "../components/CategoryExpenseTable"

function ExpenseList({expenses, deleteExpense, deleteCategory}) {

    const regularExpenses = expenses.filter(
        (expense) => !expense.category || expense.category.trim() === ""
    );
    const categorizedExpenses = expenses.filter(
        (expense) => expense.category && expense.category.trim() !== ""
    );

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Expense List</h2>
            <div className="expense-list-header">
                <span className="expense-list-header-label">Expenses</span>
            </div>
            <ExpenseTable expenses={regularExpenses} deleteExpense={deleteExpense}/>
            <h3 className="leftHeader" style={{ marginTop: "2rem", marginBottom: "0.5rem" }}>Category Expenses</h3>
            <CategoryExpenseTable
                expenses={categorizedExpenses}
                deleteExpense={deleteExpense}
                deleteCategory={deleteCategory}
            />
            <div className="expense-btn-center" style={{ marginTop: "2rem" }}>
                <Link to="/expenses/add" className="expense-black-btn" style={{ padding: "0.3rem 1.2rem", fontSize: "0.8rem" }}>+ Add Expense</Link>
            </div>
        </div>
    )
}

export default ExpenseList;
