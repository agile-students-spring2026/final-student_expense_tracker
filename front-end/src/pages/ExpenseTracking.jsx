import { Link } from "react-router-dom"

function ExpenseTracking() {
    return (
        <div>
            <h2>Expense Tracking</h2>
            <div className="buttonWrap"><Link to="/expenses/list" className="linkbutton">View Expense List</Link></div>
        </div>
    )
}

export default ExpenseTracking;