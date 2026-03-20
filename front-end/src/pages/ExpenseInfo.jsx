import { Link } from "react-router-dom"

function ExpenseInfo() {
    return (
        <div>
            <h2>Expense Info</h2>
            <div className="buttonWrap"><Link to="/expenses/list" className="linkbutton">Edit</Link></div>
        </div>
    )
}

export default ExpenseInfo;