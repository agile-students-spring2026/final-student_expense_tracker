import { Link } from "react-router-dom"

function Budget() {
    return (
        <div>
            <h2>Confirm Expense</h2>
            <div className="buttonWrap"><Link to="/budget/create" className="linkbutton">Create New Budget</Link></div>
            <div className="buttonWrap"><Link to="/budget/report" className="linkbutton">Budget Report</Link></div>
        </div>
    )
}

export default Budget;