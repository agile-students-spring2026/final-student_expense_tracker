import { Link } from "react-router-dom"

function CreateBudget() {
    return (
        <div>
            <h2>Confirm Expense</h2>
            <div className="buttonWrap"><Link to="/expenses/list" className="linkbutton">Cancel</Link></div>
            <div className="buttonWrap"><Link to="/expenses/list" className="linkbutton">Save Budget</Link></div>
        </div>
    )
}

export default CreateBudget;