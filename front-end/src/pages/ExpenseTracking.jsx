import { Link } from "react-router-dom"
import CategoryExpenseTable from "../components/CategoryExpenseTable"

function ExpenseTracking({expenses, deleteExpense, deleteCategory}) {
    const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

    return (
        <div>
            <h2 className="leftHeader">Expenses</h2>
            <div className="buttonWrap"><Link to="/expenses/add" className="linkbutton">Add Expense</Link></div>
            <div className="buttonWrap"><Link to="/expenses/list" className="linkbutton">View Expense List</Link></div>
            <p className="overviewTotal">Total: ${totalSpent.toFixed(2)}</p>
            <CategoryExpenseTable
                expenses={expenses}
                deleteExpense={deleteExpense}
                deleteCategory={deleteCategory}
            />
        </div>
    )
}

export default ExpenseTracking;
