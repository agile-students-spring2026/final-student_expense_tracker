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
        <div>
            <h2 style={{ textAlign: "center" }}>Expense Tracking</h2>

            <p className="expense-section-header">OVERVIEW</p>

            <div className="expense-overview-stats">
                <div className="expense-stat-box">
                    <span className="expense-stat-value">{totalExpenses}</span>
                    <span className="expense-stat-label">Total Expenses</span>
                </div>
                <div className="expense-stat-box">
                    <span className="expense-stat-value">{categories.length}</span>
                    <span className="expense-stat-label">Categories</span>
                </div>
                <div className="expense-stat-box">
                    <span className="expense-stat-value">${totalAmount.toFixed(0)}</span>
                    <span className="expense-stat-label">Total Amount</span>
                </div>
            </div>

            <hr className="expense-divider" />

            <p className="expense-section-header-light">CATEGORY BREAKDOWN</p>

            <div className="expense-category-breakdown">
                {categoryTotals.map(cat => (
                    <div key={cat.name} className="expense-category-breakdown-item">
                        <div className="expense-category-breakdown-name">{cat.name}</div>
                        <div
                            className="expense-progress-bar"
                            style={{ width: maxTotal > 0 ? `${(cat.total / maxTotal) * 80}%` : "0%" }}
                        ></div>
                    </div>
                ))}
            </div>

            <div className="expense-btn-center">
                <Link to="/expenses/list" className="expense-black-btn">View Expense List</Link>
            </div>
        </div>
    )
}

export default ExpenseTracking;
