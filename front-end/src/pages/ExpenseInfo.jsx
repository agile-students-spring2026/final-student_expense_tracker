import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom"

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

function ExpenseInfo({ expenses, setExpenses, currencySymbol = "$" }) {

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

    const isPreset = PRESET_CATEGORIES.includes(expense?.category);
    const [selectedCategory, setSelectedCategory] = useState(
        isPreset ? expense?.category : (expense?.category ? "Other (custom)" : "")
    );
    const [customCategory, setCustomCategory] = useState(
        isPreset ? "" : (expense?.category || "")
    );

    if (!expense) {
        return <p>Expense not found.</p>
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleCategoryChange(e) {
        const val = e.target.value;
        setSelectedCategory(val);
        if (val !== "Other (custom)") {
            setFormData((prev) => ({ ...prev, category: val }));
            setCustomCategory("");
        } else {
            setFormData((prev) => ({ ...prev, category: customCategory }));
        }
    }

    function handleCustomCategory(e) {
        const val = e.target.value;
        setCustomCategory(val);
        setFormData((prev) => ({ ...prev, category: val }));
    }

    async function handleSave(e) {
        e.preventDefault();
        try {
            const res = await fetch(`https://trackr-jxdi.onrender.com/api/expenses/${expense.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    amount: formData.amount,
                    category: formData.category.trim(),
                    details: formData.details
                })
            });
            const updatedExpense = await res.json();
            setExpenses((prev) =>
                prev.map((item) =>
                    item.id === updatedExpense.id ? updatedExpense : item
                )
            );
            setIsEditing(false);
            navigate("/expenses/list");
        } catch (err) {
            console.log("Failed to update expense:", err);
        }
    }

    function handleCancelEdit() {
        setFormData(expense);
        setIsEditing(false);
    }

    return (
        <div className="land-page">
            {!isEditing ? (
                <>
                    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "0.5rem" }}>
                        <button className="btn-green" onClick={() => navigate("/expenses/list")}>← Back to Expense List</button>
                    </div>

                    <h2 style={{ textAlign: "center" }}>Expense Info</h2>

                    <div className="land-form-card" style={{ margin: "1rem 0" }}>
                        <div className="land-confirm-row">
                            <span className="land-form-label">Expense Name</span>
                            <span className="land-confirm-value">{expense.name}</span>
                        </div>
                        <div className="land-confirm-row">
                            <span className="land-form-label">Amount</span>
                            <span className="land-confirm-value">{currencySymbol}{expense.amount}</span>
                        </div>
                        <div className="land-confirm-row">
                            <span className="land-form-label">Category</span>
                            <span className="land-confirm-value">{expense.category || "—"}</span>
                        </div>
                        <div className="land-confirm-row" style={{ borderBottom: "none" }}>
                            <span className="land-form-label">Date Added</span>
                            <span className="land-confirm-value">{expense.dateAdded}</span>
                        </div>
                    </div>

                    <div className="land-section-label">Details</div>
                    <div className="land-details-box" style={{ margin: "0 0 1.5rem" }}>
                        <p className="land-details-title">Details About Expense</p>
                        <p style={{ fontSize: "0.85rem", color: "#555", textAlign: "center" }}>
                            {expense.details || "No details added."}
                        </p>
                    </div>

                    <div className="expense-btn-center">
                        <button className="btn-green" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </>
            ) : (
                <form onSubmit={handleSave}>
                    <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "0.5rem" }}>
                        <button className="btn-green" type="button" onClick={handleCancelEdit}>← Back to Expense Preview</button>
                    </div>

                    <h2 style={{ textAlign: "center" }}>Edit Expense</h2>

                    <div className="land-form-card" style={{ margin: "1rem 0" }}>
                        <label className="land-form-label">Expense Name</label>
                        <input className="land-form-input" name="name" value={formData.name} onChange={handleChange} />

                        <label className="land-form-label">Expense Amount</label>
                        <input className="land-form-input" name="amount" value={formData.amount} onChange={handleChange} />

                        <label className="land-form-label">Category</label>
                        <select
                            className="land-form-input"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            style={{ appearance: "auto" }}
                        >
                            <option value="" disabled>Select a category</option>
                            <optgroup label="Presets">
                                {PRESET_CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </optgroup>
                            <option value="Other (custom)">Other (custom)</option>
                        </select>

                        {selectedCategory === "Other (custom)" && (
                            <>
                                <label className="land-form-label">Custom Category</label>
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
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="expense-btn-row">
                        <button className="btn-plain" type="button" onClick={handleCancelEdit}>Cancel</button>
                        <button className="btn-green" type="submit">Save</button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default ExpenseInfo;