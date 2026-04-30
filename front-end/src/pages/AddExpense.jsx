import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PRESET_CATEGORIES = [
    "Food & Dining",
    "Transport",
    "Groceries",
    "Entertainment",
    "School / Education",
    "Bills",
    "Clothing",
    "Health",
];

function AddExpense({ setPendingExpense, pastCategories = [] }) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        category: "",
        details: ""
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [errors, setErrors] = useState({});

    // Merge presets + past custom categories (no duplicates)
    const allCategories = [
        ...PRESET_CATEGORIES,
        ...pastCategories.filter(c => !PRESET_CATEGORIES.includes(c)),
        "Other (custom)",
    ];

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    }

    function handleCategoryChange(e) {
        const val = e.target.value;
        setSelectedCategory(val);
        if (val !== "Other (custom)") {
            setFormData((prev) => ({ ...prev, category: val }));
            setCustomCategory("");
        } else {
            setFormData((prev) => ({ ...prev, category: "" }));
        }
    }

    function handleCustomCategory(e) {
        const val = e.target.value;
        setCustomCategory(val);
        setFormData((prev) => ({ ...prev, category: val }));
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

                    <label className="land-form-label">Category</label>
                    <select
                        className="land-form-input"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        style={{ appearance: "auto", color: selectedCategory ? "#111" : "#aaa" }}
                    >
                        <option value="" disabled>Select a category</option>
                        {pastCategories.filter(c => !PRESET_CATEGORIES.includes(c)).length > 0 && (
                            <optgroup label="Your Categories">
                                {pastCategories.filter(c => !PRESET_CATEGORIES.includes(c)).map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </optgroup>
                        )}
                        <optgroup label="Presets">
                            {PRESET_CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </optgroup>
                        <option value="Other (custom)">Other (custom)</option>
                    </select>

                    {selectedCategory === "Other (custom)" && (
                        <>
                            <label className="land-form-label">Custom Category Name</label>
                            <input
                                className="land-form-input"
                                value={customCategory}
                                placeholder="Enter your category"
                                onChange={handleCustomCategory}
                            />
                        </>
                    )}

                    <label className="land-form-label">Details</label>
                    <div className="land-details-box">
                        <p className="land-details-title">Details About Expense</p>
                        <textarea
                            className="land-details-textarea"
                            name="details"
                            value={formData.details}
                            placeholder="Any extra notes about this expense..."
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