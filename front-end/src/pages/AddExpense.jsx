import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddExpense({ setPendingExpense }) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        category: "",
        details: ""
    });

    const [amountError, setAmountError] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        if (name === "amount") {
            setAmountError(value !== "" && isNaN(value));
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newExpense = {
            id: Date.now(),
            name: formData.name,
            amount: formData.amount,
            category: formData.category.trim(),
            details: formData.details,
            dateAdded: new Date().toLocaleDateString()
        };

        setPendingExpense(newExpense);
        navigate("/expenses/confirm");
    }

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="formContainer">
                    <label className="expense-field-label">Expense Name</label>
                    <input className="expense-input" name="name" value={formData.name} placeholder="Expense Name" onChange={handleChange} />
                </div>
                <div className="formContainer">
                    <label className="expense-field-label">Expense Amount</label>
                    <input className="expense-input" name="amount" value={formData.amount} placeholder="$$$" onChange={handleChange} />
                </div>
                <div className="formContainer">
                    <label className="expense-field-label">Category Name / Expense Category</label>
                    <input className="expense-input" name="category" value={formData.category} placeholder="Category Name" onChange={handleChange} />
                </div>
                <div className="formContainer">
                    <label className="expense-field-label">Details</label>
                    <div className="expense-details-box">
                        <p className="expense-details-box-title">Details About Expense</p>
                        <textarea
                            className="expense-details-textarea"
                            name="details"
                            value={formData.details}
                            placeholder="[Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam...]"
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {amountError && (
                    <p style={{ color: "red", fontSize: "0.8rem", textAlign: "center", marginTop: "0.5rem" }}>
                        Expense Amount must be a number.
                    </p>
                )}
                <div className="expense-btn-center">
                    <button className="expense-black-btn" type="submit" disabled={amountError}>Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddExpense;
