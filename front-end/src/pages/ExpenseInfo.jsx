import { useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom"

function ExpenseInfo({expenses, setExpenses}) {

    const {id} = useParams();
    const navigate = useNavigate();
    const expense = useMemo(
        () => expenses.find((item) => String(item.id) === id),
        [expenses,id]
    );

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(
        expense || {
            name: "",
            amount: "",
            category: "",
            details: ""
        }
    );

    if (!expense) {
        return <p>Expense not found.</p>
    }

    function handleChange(e) {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:value
        }));
    }

    function handleSave(e) {
        e.preventDefault();

        setExpenses((prev) =>
            prev.map((item) =>
                item.id === expense.id
                    ? {
                        ...item,
                        name: formData.name,
                        amount: formData.amount,
                        category: formData.category.trim(),
                        details: formData.details
                    } : item
                )
        );

        setIsEditing(false);
    }

    function handleCancelEdit() {
        setFormData(expense);
        setIsEditing(false);
    }

    return (
        <div>
            <h2>Expense Info</h2>

            {!isEditing ? (
                <>
                    <p>Expense Name: {expense.name}</p>
                    <p>Expense Amount: {expense.amount}</p>
                    <p>Expense Category: {expense.category}</p>
                    <p>Details: {expense.details}</p>
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                    <button onClick={() => navigate("/expenses/list")}>Back</button>
                </>
                ) : (
                <form onSubmit={handleSave}>
                    <div>
                        <label>Expense Name</label>
                        <input name="name" value={formData.name} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Expense Amount</label>
                        <input name="amount" value={formData.amount} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Expense Category</label>
                        <input name="category" value={formData.category} onChange={handleChange}/>
                    </div>
                    <div>
                        <label>Details</label>
                        <input name="details" value={formData.details} onChange={handleChange}/>
                    </div>
                    <button type="button" onClick={handleCancelEdit}>Cancel</button>
                    <button type="submit">Save</button>
                </form>
            )}

            <div className="buttonWrap"><Link to="/expenses/list" className="linkbutton">Edit</Link></div>
        </div>
    )
}

export default ExpenseInfo;