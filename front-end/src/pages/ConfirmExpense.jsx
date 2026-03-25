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
        navigate("/expenses/list");
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
            <p className="infodetail">Expense Name: {pendingExpense.name}</p>
            <p className="infodetail">Expense Amount: {pendingExpense.amount}</p>
            <p className="infodetail">Category: {pendingExpense.category}</p>
            <p className="infodetail">Details Name: {pendingExpense.details}</p>
            <p className="infodetail">Date Added: {pendingExpense.dateAdded}</p>
            <button className="linkbutton conf" onClick={handleCancel}>Cancel</button>
            <button className="linkbutton conf" onClick={handleConfirm}>Confirm</button>
        </div>
    )
}

export default ConfirmExpense;