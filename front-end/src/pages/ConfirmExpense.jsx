import { Link, useNavigate } from "react-router-dom"

function ConfirmExpense({pendingExpense,expenses,setExpenses,setPendingExpense}) {
    
    const navigate = useNavigate();
    function handleConfirm() {
        if (!pendingExpense) return;
        setExpenses([...expenses,pendingExpense]);
        setPendingExpense(null);
        navigate("/expenses/list");
    }
    function handleCancel() {
        setPendingExpense(null);
        navigate("/expense/list");
    }
    if (!pendingExpense) {
        return (
            <div>
                <h2>Confirm Expense</h2>
                <p>No expense is waiting for confirmation.</p>
            </div>
        )
    }
    return (
        <div>
            <h2>Confirm Expense</h2>
            <p>Expense Name: {pendingExpense.name}</p>
            <p>Expense Amount: {pendingExpense.amount}</p>
            <p>Category: {pendingExpense.category}</p>
            <p>Details Name: {pendingExpense.details}</p>
            <p>Date Added: {pendingExpense.dateAdded}</p>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleConfirm}>Confirm</button>
            <div className="buttonWrap"><Link to="/expenses/list" className="linkbutton">Cancel</Link></div>
            <div className="buttonWrap"><Link to="/expenses/list" className="linkbutton">Confirm</Link></div>
        </div>
    )
}

export default ConfirmExpense;