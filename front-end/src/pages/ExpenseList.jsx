import { Link } from "react-router-dom"
import ExpenseTable from "../components/ExpenseTable"
import CategoryExpenseTable from "../components/CategoryExpenseTable"

function ExpenseList() {
    return (
        <div>
            <h2>Expense List</h2>
            <h3 className="leftHeader">Expenses</h3>
            <div className="buttonWrap"><Link to="/expenses/add" className="linkbutton">+ Add Expense</Link></div>
            <ExpenseTable/>
            <h3 className="leftHeader">Category Expenses</h3>
            <CategoryExpenseTable/>
        </div>
    )
}

export default ExpenseList;