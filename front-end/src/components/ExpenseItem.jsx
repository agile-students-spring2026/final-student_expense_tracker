import { Link } from "react-router-dom"

function ExpenseItem({ expense, deleteExpense }) {
    return (
        <div className="expense-item-row">
  <Link
    to={`/expenses/info/${expense.id}`}
    className="expense-item-info-btn"
  >
    Info
  </Link>

  <button
    className="expense-item-x-btn"
    onClick={() => deleteExpense(expense.id)}
  >
    X
  </button>

  <div className="expense-item-cell">{expense.name}</div>
  <div className="expense-item-cell">{expense.amount}</div>
  <div className="expense-item-cell">{expense.dateAdded}</div>
</div>
    )
}

export default ExpenseItem;
