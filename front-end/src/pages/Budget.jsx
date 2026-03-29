import { Link } from "react-router-dom"

function Budget({ budget, expenses }) {
    const { incomeSources, fixedExpenses } = budget;

    const totalIncome = incomeSources.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const totalFixed = fixedExpenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

    const categoryTotals = Object.entries(
        expenses
            .filter(e => e.category && e.category.trim())
            .reduce((acc, e) => {
                const cat = e.category.trim();
                acc[cat] = (acc[cat] || 0) + parseFloat(e.amount || 0);
                return acc;
            }, {})
    );
    const totalCategory = categoryTotals.reduce((sum, [, amt]) => sum + amt, 0);

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Budgeting</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "0.75rem 1rem" }}>
                <Link to="/budget/create" className="expense-black-btn" style={{ textAlign: "center" }}>Create New Budget</Link>
                <Link to="/budget/report" className="expense-black-btn" style={{ textAlign: "center" }}>Budget Report</Link>
            </div>

            <div className="budget-section-header">Income</div>
            {incomeSources.map((src, i) => (
                <div key={i} className="budget-row">
                    <div className="budget-cell">{src.name}</div>
                    <div className="budget-cell">{src.amount}</div>
                </div>
            ))}
            <p className="budget-total-label">Total Income: {totalIncome > 0 ? `$${totalIncome.toFixed(2)}` : ""}</p>

            <div className="budget-section-header">Fixed Expenses</div>
            {fixedExpenses.map((exp, i) => (
                <div key={i} className="budget-row">
                    <div className="budget-cell">{exp.name}</div>
                    <div className="budget-cell">{exp.amount}</div>
                </div>
            ))}
            <p className="budget-total-label">Total Expenses: {totalFixed > 0 ? `$${totalFixed.toFixed(2)}` : ""}</p>

            <div className="budget-section-header">Category Expenses</div>
            {categoryTotals.map(([name, amt], i) => (
                <div key={i} className="budget-row">
                    <div className="budget-cell">{name}</div>
                    <div className="budget-cell">${amt.toFixed(2)}</div>
                </div>
            ))}
            <p className="budget-total-label">Total Category Expenses: {totalCategory > 0 ? `$${totalCategory.toFixed(2)}` : ""}</p>

            <div className="budget-section-header">Summary</div>
            <div className="budget-summary-pair">
                <p className="budget-total-label">Total Income: {totalIncome > 0 ? `$${totalIncome.toFixed(2)}` : ""}</p>
                <p className="budget-total-label">Total Expenses: {totalFixed > 0 ? `$${totalFixed.toFixed(2)}` : ""}</p>
            </div>
            <p className="budget-total-label">Total Category Expenses: {totalCategory > 0 ? `$${totalCategory.toFixed(2)}` : ""}</p>
        </div>
    )
}

export default Budget;
