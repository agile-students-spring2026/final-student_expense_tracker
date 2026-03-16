import { Link } from "react-router-dom"

function AddExpense() {
    return (
        <div>
            <h2>Add Expense</h2>
            <div className="buttonWrap"><Link to="/expenses/confirm" className="linkbutton">Add</Link></div>
        </div>
    )
}

export default AddExpense;