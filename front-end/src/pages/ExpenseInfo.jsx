import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"

function ExpenseInfo({ expenses, setExpenses }) {

    const { id } = useParams();
    const navigate = useNavigate();
    const expense = useMemo(
        () => expenses.find((item) => String(item.id) === id),
        [expenses, id]
    );

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(
        expense || { name: "", amount: "", category: "", details: "" }
    );

    if (!expense) {
        return <p>Expense not found.</p>
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSave(e) {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/expenses/${expense.id}`, {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    amount: formData.amount,
                    category: formData.category.trim(),
                    details: formData.details
                })
            });
            const updatedExpenses = await res.json();
            setExpenses((prev) =>
                prev.map((item) =>
                    item.id === updatedExpenses.id ? updatedExpenses : item
            )
        );
        setIsEditing(false);
        } catch (err) {
            console.log("Failed to update expense:", err);
        }
    }

    function handleCancelEdit() {
        setFormData(expense);
        setIsEditing(false);
    }

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Expense Info</h2>

            {!isEditing ? (
                <>
                    <p className="expense-field-value">Expense Name: {expense.name}</p>
                    <p className="expense-field-value">Expense Amount: {expense.amount}</p>
                    <p className="expense-field-value">Expense Category: {expense.category}</p>
                    <p className="expense-field-label">Details</p>
                    <div className="expense-details-box">
                        <p className="expense-details-box-title">Details About Expense</p>
                        <p style={{ fontSize: "0.85rem" }}>{expense.details}</p>
                    </div>
                    <div className="expense-btn-center">
                        <button className="expense-black-btn" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSave}>
                    <div className="formContainer">
                        <label className="expense-field-label">Expense Name</label>
                        <input className="expense-input" name="name" value={formData.name} onChange={handleChange} />
                    </div>
                    <div className="formContainer">
                        <label className="expense-field-label">Expense Amount</label>
                        <input className="expense-input" name="amount" value={formData.amount} onChange={handleChange} />
                    </div>
                    <div className="formContainer">
                        <label className="expense-field-label">Expense Category</label>
                        <input className="expense-input" name="category" value={formData.category} onChange={handleChange} />
                    </div>
                    <div className="formContainer">
                        <label className="expense-field-label">Details</label>
                        <div className="expense-details-box">
                            <p className="expense-details-box-title">Details About Expense</p>
                            <textarea
                                className="expense-details-textarea"
                                name="details"
                                value={formData.details}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="expense-btn-row">
                        <button className="expense-cancel-btn" type="button" onClick={handleCancelEdit}>Cancel</button>
                        <button className="expense-black-btn" type="submit">Save</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ExpenseInfo;
