import { Link } from "react-router-dom"

function ExpenseTracking({ expenses }) {
    const totalExpenses = expenses.length;
    const categories = [...new Set(expenses.filter(e => e.category && e.category.trim()).map(e => e.category.trim()))];
    const totalAmount = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);

    const categoryTotals = categories.map(cat => {
        const total = expenses
            .filter(e => e.category && e.category.trim() === cat)
            .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0);
        return { name: cat, total };
    });
    const maxTotal = categoryTotals.length > 0 ? Math.max(...categoryTotals.map(c => c.total)) : 1;

    return (
        <div className="land-page">
            <h2>Expense Tracking</h2>

            <div className="land-section-label">Overview</div>

            <div className="expense-overview-stats">
                <div className="land-stat-box">
                    <span className="land-stat-value">{totalExpenses}</span>
                    <span className="land-stat-label">Total Expenses</span>
                </div>
                <div className="land-stat-box">
                    <span className="land-stat-value">{categories.length}</span>
                    <span className="land-stat-label">Categories</span>
                </div>
                <div className="land-stat-box">
                    <span className="land-stat-value">${totalAmount.toFixed(0)}</span>
                    <span className="land-stat-label">Total Amount</span>
                </div>
            </div>

            <hr className="land-divider" />

            <div className="land-section-label">Category Breakdown</div>

            <div className="expense-category-breakdown">
                {categoryTotals.map(cat => (
                    <div key={cat.name} className="land-breakdown-item">
                        <div className="land-breakdown-name">{cat.name}</div>
                        <div className="land-progress-track">
                            <div
                                className="land-progress-bar"
                                style={{ width: maxTotal > 0 ? `${(cat.total / maxTotal) * 100}%` : "0%" }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="land-btn-row" style={{ marginTop: "1.5rem" }}>
                <Link to="/expenses/list" className="btn-green">View Expense List</Link>
            </div>
        </div>
    )
}

export default ExpenseTracking;
