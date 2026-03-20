import { useState } from 'react'
import { Link } from "react-router-dom"

function ExpenseItem() {

    return (
        <div>
            <div className="expenseContainerTop"> 
                <span className="infobuttonWrap"><Link to="/expenses/info" className="infobutton">Info</Link></span>
                <button className="infoX">X</button>
            </div>
            <div className="expenseContainerBottom">
                <div className="expensedetail">Name</div>
                <div className="expensedetail">Amount</div>
                <div className="expensedetail">Date</div>
            </div>
        </div>
    )
}

export default ExpenseItem;