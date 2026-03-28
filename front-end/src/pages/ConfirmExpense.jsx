import { useNavigate } from "react-router-dom"

function ConfirmExpense({ pendingExpense, expenses, setExpenses, setPendingExpense }) {

    const navigate = useNavigate();

    function handleConfirm() {
        if (!pendingExpense) return;
        setExpenses([...expenses, pendingExpense]);
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
                <h2 style={{ textAlign: "center" }}>Confirm Expense</h2>
                <p>No expense is waiting for confirmation.</p>
            </div>
        )
    }

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Confirm Expense</h2>

            <p className="expense-field-value">Expense Name: {pendingExpense.name}</p>
            <p className="expense-field-value">Expense Amount: {pendingExpense.amount}</p>
            <p className="expense-field-value">Category Name / Expense Category: {pendingExpense.category}</p>
            <p className="expense-field-label">Details</p>
            <div className="expense-details-box">
                <p className="expense-details-box-title">Details About Expense</p>
                <p style={{ fontSize: "0.85rem" }}>{pendingExpense.details}</p>
            </div>

            <div className="expense-btn-row">
                <button className="expense-cancel-btn" onClick={handleCancel}>Cancel</button>
                <button className="expense-black-btn" onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmExpense;
