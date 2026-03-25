import { useState } from 'react'
import { Link } from "react-router-dom"

function ExpenseItem({expense, deleteExpense}) {

    return (
        <div>
            <div className="expenseContainerTop"> 
                <span className="infobuttonWrap"><Link to={`/expenses/info/${expense.id}`} className="infobutton">Info</Link></span>
                <button className="infoX" onClick={() => deleteExpense(expense.id)}>X</button>
            </div>
            <div className="expenseContainerBottom">
                <div className="expensedetail">{expense.name}</div>
                <div className="expensedetail">{expense.amount}</div>
                <div className="expensedetail">{expense.dateAdded}</div>
            </div>
        </div>
    )
}

export default ExpenseItem;