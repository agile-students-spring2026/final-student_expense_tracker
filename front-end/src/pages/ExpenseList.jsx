import { Link } from "react-router-dom"
import ExpenseTable from "../components/ExpenseTable"
import CategoryExpenseTable from "../components/CategoryExpenseTable"

function ExpenseList({expenses}) {

    const regularExpenses = expenses.filter(
        (expense) => !expense.category || !expense.category.trim() === ""
    );
    const categorizedExpenses = expenses.filter(
        (expense) => expense.category && expense.category.trim() !== ""
    );

    return (
        <div>
            <h2>Expense List</h2>
            <h3 className="leftHeader">Expenses</h3>
            <div className="buttonWrap"><Link to="/expenses/add" className="linkbutton">+ Add Expense</Link></div>
            <ExpenseTable expenses={regularExpenses}/>
            <h3 className="leftHeader">Category Expenses</h3>
            <CategoryExpenseTable expenses={categorizedExpenses}/>
        </div>
    )
}

export default ExpenseList;