function BudgetReport({ budget, expenses }) {
    const { incomeSources, fixedExpenses } = budget;

    const categoryTotals = Object.entries(
        expenses
            .filter(e => e.category && e.category.trim())
            .reduce((acc, e) => {
                const cat = e.category.trim();
                acc[cat] = (acc[cat] || 0) + parseFloat(e.amount || 0);
                return acc;
            }, {})
    );

    const totalIncome = incomeSources.reduce((sum, s) => sum + parseFloat(s.amount || 0), 0);
    const totalFixed = fixedExpenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
    const totalCategory = categoryTotals.reduce((sum, [, amt]) => sum + amt, 0);
    const netBalance = totalIncome - totalFixed - totalCategory;

    const highestFixed = fixedExpenses.length > 0
        ? fixedExpenses.reduce((max, e) => parseFloat(e.amount || 0) > parseFloat(max.amount || 0) ? e : max, fixedExpenses[0])
        : null;
    const highestCategory = categoryTotals.length > 0
        ? categoryTotals.reduce((max, cur) => cur[1] > max[1] ? cur : max)
        : null;

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Budget Report</h2>

            {/* Income */}
            <div className="budget-section-header">Income</div>
            {incomeSources.map((src, i) => (
                <div key={i} className="budget-row">
                    <div className="budget-cell">{src.name}</div>
                    <div className="budget-cell">{src.amount}</div>
                    <div className="budget-cell">{src.amount}</div>
                    <div className="budget-cell">$0</div>
                </div>
            ))}
            <div className="budget-total-row">
                <div className="budget-total-row-label">Total:</div>
                <div className="budget-total-row-label">${totalIncome.toFixed(2)}</div>
                <div className="budget-total-row-label">${totalIncome.toFixed(2)}</div>
                <div className="budget-total-row-label">$0</div>
            </div>

            {/* Fixed Expenses */}
            <div className="budget-section-header">Fixed Expenses</div>
            {fixedExpenses.map((exp, i) => (
                <div key={i} className="budget-row">
                    <div className="budget-cell">{exp.name}</div>
                    <div className="budget-cell">{exp.amount}</div>
                    <div className="budget-cell">{exp.amount}</div>
                    <div className="budget-cell">$0</div>
                </div>
            ))}
            <div className="budget-total-row">
                <div className="budget-total-row-label">Total:</div>
                <div className="budget-total-row-label">${totalFixed.toFixed(2)}</div>
                <div className="budget-total-row-label">${totalFixed.toFixed(2)}</div>
                <div className="budget-total-row-label">$0</div>
            </div>

            {/* Category Expenses */}
            <div className="budget-section-header">Category Expenses</div>
            {categoryTotals.map(([name, amt], i) => (
                <div key={i} className="budget-row">
                    <div className="budget-cell">{name}</div>
                    <div className="budget-cell">${amt.toFixed(2)}</div>
                    <div className="budget-cell">$0</div>
                    <div className="budget-cell">-${amt.toFixed(2)}</div>
                </div>
            ))}
            <div className="budget-total-row">
                <div className="budget-total-row-label">Total:</div>
                <div className="budget-total-row-label">${totalCategory.toFixed(2)}</div>
                <div className="budget-total-row-label">$0</div>
                <div className="budget-total-row-label">-${totalCategory.toFixed(2)}</div>
            </div>

            {/* General Summary */}
            <div className="budget-section-header">General Summary</div>
            <div className="budget-summary-pair">
                <p className="budget-total-label">Total Income: ${totalIncome.toFixed(2)}</p>
                <p className="budget-total-label">Total Expenses: ${totalFixed.toFixed(2)}</p>
            </div>
            <p className="budget-total-label">Total Category Expenses: ${totalCategory.toFixed(2)}</p>
            <p className="budget-total-label">Net Balance: ${netBalance.toFixed(2)}</p>
            <p className="budget-total-label">Highest Fixed Expense: {highestFixed ? highestFixed.name : ""}</p>
            <p className="budget-total-label">Highest Category Expense: {highestCategory ? highestCategory[0] : ""}</p>
        </div>
    )
}

export default BudgetReport;
