import { Link } from "react-router-dom"
import ExpenseTable from "../components/ExpenseTable"
import CategoryExpenseTable from "../components/CategoryExpenseTable"

function ExpenseList({expenses, deleteExpense, deleteCategory}) {

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
            <ExpenseTable expenses={regularExpenses} deleteExpense={deleteExpense}/>
            <h3 className="leftHeader">Category Expenses</h3>
            <CategoryExpenseTable 
            expenses={categorizedExpenses}
            deleteExpense={deleteExpense}
            deleteCategory={deleteCategory}
            />
        </div>
    )
}

export default ExpenseList;