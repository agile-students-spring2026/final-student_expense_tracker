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
        <div className="land-page">
            <h2>Budgeting</h2>

            <div className="land-btn-row">
                <Link to="/budget/create" className="btn-green">Create New Budget</Link>
                <Link to="/budget/report" className="btn-plain">Budget Report</Link>
            </div>

            <div className="land-section-label">Income</div>
            {incomeSources.map((src, i) => (
                <div key={i} className="land-budget-row">
                    <div className="budget-cell">{src.name}</div>
                    <div className="budget-cell">{src.amount}</div>
                </div>
            ))}
            <p className="land-budget-total">Total Income: {totalIncome > 0 ? `$${totalIncome.toFixed(2)}` : ""}</p>

            <div className="land-section-label">Fixed Expenses</div>
            {fixedExpenses.map((exp, i) => (
                <div key={i} className="land-budget-row">
                    <div className="budget-cell">{exp.name}</div>
                    <div className="budget-cell">{exp.amount}</div>
                </div>
            ))}
            <p className="land-budget-total">Total Expenses: {totalFixed > 0 ? `$${totalFixed.toFixed(2)}` : ""}</p>

            <div className="land-section-label">Category Expenses</div>
            {categoryTotals.map(([name, amt], i) => (
                <div key={i} className="land-budget-row">
                    <div className="budget-cell">{name}</div>
                    <div className="budget-cell">${amt.toFixed(2)}</div>
                </div>
            ))}
            <p className="land-budget-total">Total Category Expenses: {totalCategory > 0 ? `$${totalCategory.toFixed(2)}` : ""}</p>

            <div className="land-section-label">Summary</div>
            <div className="land-summary-box">
                <p className="land-budget-total">Total Income: {totalIncome > 0 ? `$${totalIncome.toFixed(2)}` : ""}</p>
                <p className="land-budget-total">Total Expenses: {totalFixed > 0 ? `$${totalFixed.toFixed(2)}` : ""}</p>
                <p className="land-budget-total">Total Category Expenses: {totalCategory > 0 ? `$${totalCategory.toFixed(2)}` : ""}</p>
            </div>
        </div>
    )
}

export default Budget;
