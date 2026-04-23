import { useNavigate } from "react-router-dom"

function ConfirmExpense({ pendingExpense, expenses, setExpenses, setPendingExpense }) {

    const navigate = useNavigate();

    async function handleConfirm() {
        if (!pendingExpense) return;
        console.log("Sending:", {
            name: pendingExpense.name,
            amount: Number(pendingExpense.amount),
            category: pendingExpense.category,
            details: pendingExpense.details,
            dateAdded: pendingExpense.dateAdded
        })

        try {
            const res = await fetch("http://localhost:3000/api/expenses", {
                method:"POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name: pendingExpense.name,
                    amount: Number(pendingExpense.amount),
                    category: pendingExpense.category,
                    details: pendingExpense.details,
                    dateAdded: pendingExpense.dateAdded
            })
        });
            console.log("Status:", res.status)
            const savedExpense = await res.json();
            console.log("Response:", savedExpense)
            setExpenses(prev => [...prev, savedExpense]);
            setPendingExpense(null);
            navigate("/expenses/list");
        }catch (err) {
            console.log("Failed to save expense:", err);
        }
    }





    function handleCancel() {
        setPendingExpense(null);
        navigate("/expenses/list");
    }

    if (!pendingExpense) {
        return (
            <div className="land-page">
                <h2>Confirm Expense</h2>
                <p style={{ textAlign: "center", color: "#777", marginTop: "1rem" }}>No expense is waiting for confirmation.</p>
            </div>
        )
    }

    return (
        <div className="land-page">
            <h2>Confirm Expense</h2>

            <div className="land-form-card">
                <div className="land-confirm-row">
                    <span className="land-form-label">Expense Name</span>
                    <span className="land-confirm-value">{pendingExpense.name}</span>
                </div>
                <div className="land-confirm-row">
                    <span className="land-form-label">Expense Amount</span>
                    <span className="land-confirm-value">{pendingExpense.amount}</span>
                </div>
                <div className="land-confirm-row">
                    <span className="land-form-label">Category</span>
                    <span className="land-confirm-value">{pendingExpense.category}</span>
                </div>
                <label className="land-form-label" style={{ marginTop: "0.5rem" }}>Details</label>
                <div className="land-details-box">
                    <p className="land-details-title">Details About Expense</p>
                    <p style={{ fontSize: "0.85rem", color: "#555", textAlign: "center" }}>{pendingExpense.details}</p>
                </div>
            </div>

            <div className="expense-btn-row" style={{ padding: "0 1.5rem", marginTop: "2rem" }}>
                <button className="btn-plain" onClick={handleCancel}>Cancel</button>
                <button className="btn-green" onClick={handleConfirm}>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmExpense;
