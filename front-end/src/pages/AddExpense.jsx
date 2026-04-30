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

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error as user types
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Expense name is required.";
        if (!formData.amount) {
            newErrors.amount = "Expense amount is required.";
        } else if (isNaN(formData.amount) || Number(formData.amount) < 0) {
            newErrors.amount = "Expense amount must be a valid positive number.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newExpense = {
            id: Date.now(),
            name: formData.name,
            amount: Number(formData.amount),
            category: formData.category.trim(),
            details: formData.details,
            dateAdded: new Date().toISOString()
        };

        setPendingExpense(newExpense);
        navigate("/expenses/confirm");
    }

    return (
        <div className="land-page">
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div className="land-form-card">
                    <label className="land-form-label">Expense Name</label>
                    <input
                        className="land-form-input"
                        name="name"
                        value={formData.name}
                        placeholder="Expense Name"
                        onChange={handleChange}
                        style={errors.name ? { borderColor: "#e05454" } : {}}
                    />
                    {errors.name && <p style={{ color: "#e05454", fontSize: "0.78rem", marginTop: "0.2rem" }}>{errors.name}</p>}

                    <label className="land-form-label">Expense Amount</label>
                    <input
                        className="land-form-input"
                        name="amount"
                        value={formData.amount}
                        placeholder="$$$"
                        onChange={handleChange}
                        style={errors.amount ? { borderColor: "#e05454" } : {}}
                    />
                    {errors.amount && <p style={{ color: "#e05454", fontSize: "0.78rem", marginTop: "0.2rem" }}>{errors.amount}</p>}

                    <label className="land-form-label">Category Name / Expense Category</label>
                    <input className="land-form-input" name="category" value={formData.category} placeholder="Category Name" onChange={handleChange} />

                    <label className="land-form-label">Details</label>
                    <div className="land-details-box">
                        <p className="land-details-title">Details About Expense</p>
                        <textarea
                            className="land-details-textarea"
                            name="details"
                            value={formData.details}
                            placeholder="[Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam...]"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="land-btn-row" style={{ marginTop: "1.5rem" }}>
                    <button className="btn-green" type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddExpense;