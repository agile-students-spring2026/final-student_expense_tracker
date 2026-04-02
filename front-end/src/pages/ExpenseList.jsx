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
        <div className="land-page">
            <h2>Expense List</h2>
            <div className="land-section-label">Expenses</div>
            <ExpenseTable expenses={regularExpenses} deleteExpense={deleteExpense}/>
            <div className="land-section-label" style={{ marginTop: "1rem" }}>Category Expenses</div>
            <CategoryExpenseTable
                expenses={categorizedExpenses}
                deleteExpense={deleteExpense}
                deleteCategory={deleteCategory}
            />
            <div className="land-btn-row" style={{ marginTop: "1.5rem" }}>
                <Link to="/expenses/add" className="btn-green">+ Add Expense</Link>
            </div>
        </div>
    )
}

export default ExpenseList;
