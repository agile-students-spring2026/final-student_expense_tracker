import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateBudget({ budget, setBudget }) {
    const navigate = useNavigate();

    const [incomeSources, setIncomeSources] = useState(
        budget.incomeSources.length > 0 ? budget.incomeSources : [{ name: "", amount: "" }]
    );
    const [fixedExpenses, setFixedExpenses] = useState(
        budget.fixedExpenses.length > 0 ? budget.fixedExpenses : [{ name: "", amount: "" }]
    );
    const [period, setPeriod] = useState(budget.period || "Monthly");

    function handleIncomeChange(index, field, value) {
        setIncomeSources(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
    }

    function handleFixedChange(index, field, value) {
        setFixedExpenses(prev => prev.map((e, i) => i === index ? { ...e, [field]: value } : e));
    }

    function handleSave(e) {
        e.preventDefault();
        setBudget({
            incomeSources: incomeSources.filter(s => s.name.trim()),
            fixedExpenses: fixedExpenses.filter(e => e.name.trim()),
            period
        });
        navigate("/budget");
    }

    function handleCancel() {
        navigate("/budget");
    }

    return (
        <div className="land-page">
            <h2>Create Budget</h2>

            <form onSubmit={handleSave}>
                <div className="land-section-label">Income Sources</div>
                {incomeSources.map((src, i) => (
                    <div key={i} className="land-form-card">
                        <label className="land-form-label">Source Name</label>
                        <input
                            className="land-form-input"
                            value={src.name}
                            placeholder="e.g. Salary"
                            onChange={e => handleIncomeChange(i, "name", e.target.value)}
                        />
                        <label className="land-form-label">Amount</label>
                        <input
                            className="land-form-input"
                            value={src.amount}
                            placeholder="$$$"
                            onChange={e => handleIncomeChange(i, "amount", e.target.value)}
                        />
                    </div>
                ))}
                <div className="land-btn-row" style={{ marginTop: "0.75rem" }}>
                    <button
                        type="button"
                        className="btn-green"
                        onClick={() => setIncomeSources(prev => [...prev, { name: "", amount: "" }])}
                    >+ Add Another Source</button>
                </div>

                <div className="land-section-label" style={{ marginTop: "1rem" }}>Fixed Expenses</div>
                {fixedExpenses.map((exp, i) => (
                    <div key={i} className="land-form-card">
                        <label className="land-form-label">Expense Name</label>
                        <input
                            className="land-form-input"
                            value={exp.name}
                            placeholder="e.g. Rent"
                            onChange={e => handleFixedChange(i, "name", e.target.value)}
                        />
                        <label className="land-form-label">Amount</label>
                        <input
                            className="land-form-input"
                            value={exp.amount}
                            placeholder="$$$"
                            onChange={e => handleFixedChange(i, "amount", e.target.value)}
                        />
                    </div>
                ))}
                <div className="land-btn-row" style={{ marginTop: "0.75rem" }}>
                    <button
                        type="button"
                        className="btn-green"
                        onClick={() => setFixedExpenses(prev => [...prev, { name: "", amount: "" }])}
                    >+ Add Another Expense</button>
                </div>

                <div className="land-section-label" style={{ marginTop: "1rem" }}>Budget Period</div>
                <div className="land-form-card">
                    <label className="land-form-label">Period</label>
                    <select
                        className="land-form-input"
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>

                <div className="expense-btn-row" style={{ padding: "0 1.5rem", marginTop: "2rem" }}>
                    <button type="button" className="btn-plain" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="btn-green">Save Budget</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBudget;
