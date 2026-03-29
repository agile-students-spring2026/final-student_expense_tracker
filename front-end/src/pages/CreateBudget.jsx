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
        <div>
            <h2 style={{ textAlign: "center" }}>Create Budget</h2>

            <form onSubmit={handleSave}>
                <p className="budget-form-section-title">Income Sources</p>
                {incomeSources.map((src, i) => (
                    <div key={i}>
                        <div className="formContainer">
                            <label className="expense-field-label">Source Name</label>
                            <input
                                className="expense-input"
                                value={src.name}
                                placeholder="e.g. Salary"
                                onChange={e => handleIncomeChange(i, "name", e.target.value)}
                            />
                        </div>
                        <div className="formContainer">
                            <label className="expense-field-label">Amount</label>
                            <input
                                className="expense-input"
                                value={src.amount}
                                placeholder="$$$"
                                onChange={e => handleIncomeChange(i, "amount", e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <div className="expense-btn-center" style={{ marginTop: "0.75rem" }}>
                    <button
                        type="button"
                        className="expense-black-btn"
                        onClick={() => setIncomeSources(prev => [...prev, { name: "", amount: "" }])}
                    >+ Add Another Source</button>
                </div>

                <p className="budget-form-section-title">Fixed Expenses</p>
                {fixedExpenses.map((exp, i) => (
                    <div key={i}>
                        <div className="formContainer">
                            <label className="expense-field-label">Expense Name</label>
                            <input
                                className="expense-input"
                                value={exp.name}
                                placeholder="e.g. Salary"
                                onChange={e => handleFixedChange(i, "name", e.target.value)}
                            />
                        </div>
                        <div className="formContainer">
                            <label className="expense-field-label">Amount</label>
                            <input
                                className="expense-input"
                                value={exp.amount}
                                placeholder="$$$"
                                onChange={e => handleFixedChange(i, "amount", e.target.value)}
                            />
                        </div>
                    </div>
                ))}
                <div className="expense-btn-center" style={{ marginTop: "0.75rem" }}>
                    <button
                        type="button"
                        className="expense-black-btn"
                        onClick={() => setFixedExpenses(prev => [...prev, { name: "", amount: "" }])}
                    >+ Add Another Expense</button>
                </div>

                <p className="budget-form-section-title-light">Budget Period</p>
                <div className="formContainer">
                    <label className="expense-field-label">Period</label>
                    <select
                        className="budget-period-select"
                        value={period}
                        onChange={e => setPeriod(e.target.value)}
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>

                <div className="expense-btn-row" style={{ padding: "0 1.5rem", marginTop: "2rem" }}>
                    <button type="button" className="expense-cancel-btn" onClick={handleCancel}>Cancel</button>
                    <button type="submit" className="expense-black-btn">Save Budget</button>
                </div>
            </form>
        </div>
    )
}

export default CreateBudget;
