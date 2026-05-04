import { useState, useRef } from "react";
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
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        category: "",
        details: ""
    });
    const [selectedCategory, setSelectedCategory] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [errors, setErrors] = useState({});
    const [scanning, setScanning] = useState(false);
    const [scanError, setScanError] = useState("");
    const [scannedPreview, setScannedPreview] = useState(null);

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

    async function compressImage(file) {
        return new Promise((resolve) => {
            const img = new Image();
            const url = URL.createObjectURL(file);
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxWidth = 1200;
                const scale = Math.min(1, maxWidth / img.width);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                URL.revokeObjectURL(url);
                canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.7);
            };
            img.src = url;
        });
    }

    async function handleReceiptScan(e) {
        const file = e.target.files[0];
        if (!file) return;

        setScanning(true);
        setScanError("");
        setScannedPreview(URL.createObjectURL(file));

        try {
            const compressed = await compressImage(file);
            const data = new FormData();
            data.append("receipt", compressed, "receipt.jpg");

            const res = await fetch("http://localhost:3000/api/scan-receipt", {
                method: "POST",
                body: data
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || "Scan failed");

            if (result.name) setFormData(prev => ({ ...prev, name: result.name }));
            if (result.amount) setFormData(prev => ({ ...prev, amount: result.amount }));
            if (result.details) setFormData(prev => ({ ...prev, details: result.details }));
            if (result.category) {
                setSelectedCategory(result.category);
                setFormData(prev => ({ ...prev, category: result.category }));
            }

        } catch (err) {
            setScanError("Couldn't read receipt — please fill in manually.");
        } finally {
            setScanning(false);
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
            <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: "0.5rem" }}>
                <button className="btn-green" onClick={() => navigate("/expenses/list")}>← Back to Expense List</button>
            </div>
            <h2>Add Expense</h2>

            {/* Scan Receipt button */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    style={{ display: "none" }}
                    onChange={handleReceiptScan}
                />
                <button
                    type="button"
                    className="btn-plain"
                    onClick={() => fileInputRef.current.click()}
                    disabled={scanning}
                    style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                    {scanning ? "Scanning..." : "📷 Scan Receipt"}
                </button>
            </div>

            {scannedPreview && (
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
                    <img src={scannedPreview} alt="Receipt preview" style={{ maxHeight: "120px", borderRadius: "8px", border: "1px solid #ede9e0" }} />
                </div>
            )}

            {scanError && (
                <p style={{ color: "#e05454", fontSize: "0.8rem", textAlign: "center", marginBottom: "0.75rem" }}>{scanError}</p>
            )}

            {scanning && (
                <p style={{ color: "#3db87a", fontSize: "0.8rem", textAlign: "center", marginBottom: "0.75rem" }}>
                    Reading receipt...
                </p>
            )}

            <form onSubmit={handleSubmit}>

                {/* OR divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1rem 0" }}>
                    <div style={{ flex: 1, height: "1px", background: "#ede9e0" }} />
                    <span style={{ color: "#aaa", fontSize: "12px", fontWeight: 600 }}>OR</span>
                    <div style={{ flex: 1, height: "1px", background: "#ede9e0" }} />
                </div>

                <div className="land-section-label" style={{ paddingLeft: 0, paddingTop: 0 }}>Input Info</div>

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
                        placeholder="Enter amount"
                        autoComplete="off"
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