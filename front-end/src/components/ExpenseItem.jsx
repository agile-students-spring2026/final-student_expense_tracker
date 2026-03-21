import { useState } from 'react'
import { Link } from "react-router-dom"

function ExpenseItem({expense}) {
    
    return (
        <div>
            <div className="expenseContainerTop"> 
                <span className="infobuttonWrap"><Link to="/expenses/info" className="infobutton">Info</Link></span>
                <button className="infoX">X</button>
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