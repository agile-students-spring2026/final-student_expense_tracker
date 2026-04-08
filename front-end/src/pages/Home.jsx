import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const CATEGORY_COLORS = ["#3db87a", "#4a90d9", "#f5a623", "#e05555", "#9b59b6", "#1abc9c", "#e67e22"]

function DonutChart({ percent }) {
    const radius = 44
    const stroke = 10
    const normalizedRadius = radius - stroke / 2
    const circumference = 2 * Math.PI * normalizedRadius
    const offset = circumference - (Math.min(percent, 100) / 100) * circumference
    const color = percent >= 90 ? "#e05555" : percent >= 70 ? "#f5a623" : "#3db87a"

    return (
        <svg width="110" height="110" viewBox="0 0 110 110">
            <circle
                cx="55" cy="55" r={normalizedRadius}
                fill="none" stroke="#f0ede6" strokeWidth={stroke}
            />
            <circle
                cx="55" cy="55" r={normalizedRadius}
                fill="none" stroke={color} strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 55 55)"
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
            <text x="55" y="50" textAnchor="middle" fontSize="17" fontWeight="700" fill="#111">
                {Math.round(percent)}%
            </text>
            <text x="55" y="65" textAnchor="middle" fontSize="10" fill="#aaa">used</text>
        </svg>
    )
}

function Home() {
    const [expenses, setExpenses] = useState([])
    const [budget, setBudget] = useState({ incomeSources: [], fixedExpenses: [], period: "Monthly" })

    useEffect(() => {
        fetch("http://localhost:3000/api/expenses")
            .then(r => r.json())
            .then(setExpenses)
            .catch(() => {})
        fetch("http://localhost:3000/api/budget")
            .then(r => r.json())
            .then(setBudget)
            .catch(() => {})
    }, [])

    const totalSpent = expenses.reduce((sum, e) => sum + parseFloat(e.amount || 0), 0)
    const categories = [...new Set(expenses.filter(e => e.category?.trim()).map(e => e.category.trim()))]

    const categoryTotals = categories.map((cat, i) => {
        const total = expenses
            .filter(e => e.category?.trim() === cat)
            .reduce((sum, e) => sum + parseFloat(e.amount || 0), 0)
        return { name: cat, total, color: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }
    }).sort((a, b) => b.total - a.total)

    const maxCatTotal = categoryTotals.length > 0 ? Math.max(...categoryTotals.map(c => c.total)) : 1

    const recentExpenses = [...expenses]
        .sort((a, b) => (b.id || 0) - (a.id || 0))
        .slice(0, 3)

    const totalBudget = (budget.incomeSources || []).reduce((sum, s) => sum + parseFloat(s.amount || 0), 0)
    const remaining = totalBudget - totalSpent
    const budgetPercent = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0

    const currentMonth = new Date().toLocaleString("default", { month: "long" })

    return (
        <div className="land-page">
            {/* Header */}
            <div className="dash-header">
                <h2 style={{ textAlign: "left", padding: "2rem 1rem 0.2rem", fontSize: "1.6rem" }}>Home</h2>
                <p className="dash-subtitle">Here's how your spending looks this {currentMonth}</p>
            </div>

            {/* Top stat cards */}
            <div className="dash-stats-row">
                <div className="dash-stat-hero">
                    <div className="dash-stat-hero-label">TOTAL SPENT</div>
                    <div className="dash-stat-hero-value">${totalSpent.toFixed(0)}</div>
                    <div className="dash-stat-hero-sub">this month</div>
                </div>
                <div className="dash-stat-side">
                    <div className="dash-stat-mini">
                        <div className="dash-mini-label">EXPENSES</div>
                        <div className="dash-mini-value">{expenses.length}</div>
                        <div className="dash-mini-sub">logged so far</div>
                    </div>
                    <div className="dash-stat-mini">
                        <div className="dash-mini-label">CATEGORIES</div>
                        <div className="dash-mini-value">{categories.length}</div>
                        <div className="dash-mini-sub dash-mini-cats">
                            {categories.slice(0, 3).map((c, i) => (
                                <span key={c} style={{ color: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}>
                                    {c.toLowerCase()}{i < Math.min(categories.length, 3) - 1 ? " · " : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spending by category + Recent expenses */}
            <div className="dash-mid-row">
                <div className="dash-card dash-card-wide">
                    <div className="dash-card-title">Spending by category</div>
                    {categoryTotals.length === 0 ? (
                        <p className="dash-empty">No expenses yet</p>
                    ) : (
                        categoryTotals.map(cat => (
                            <div key={cat.name} className="dash-bar-item">
                                <div className="dash-bar-name">{cat.name}</div>
                                <div className="dash-bar-track">
                                    <div
                                        className="dash-bar-fill"
                                        style={{
                                            width: `${(cat.total / maxCatTotal) * 100}%`,
                                            background: cat.color
                                        }}
                                    />
                                </div>
                                <div className="dash-bar-amount">${cat.total.toFixed(0)}</div>
                            </div>
                        ))
                    )}
                </div>

                <div className="dash-card dash-card-narrow">
                    <div className="dash-card-title">Recent expenses</div>
                    {recentExpenses.length === 0 ? (
                        <p className="dash-empty">None yet</p>
                    ) : (
                        recentExpenses.map(e => (
                            <Link to={`/expenses/info/${e.id}`} key={e.id} className="dash-recent-item">
                                <div>
                                    <div className="dash-recent-name">{e.name}</div>
                                    <div className="dash-recent-cat">{e.category || "Other"}</div>
                                </div>
                                <div className="dash-recent-amount">-${parseFloat(e.amount || 0).toFixed(0)}</div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* Budget row */}
            {totalBudget > 0 ? (
                <div className="dash-mid-row">
                    <div className="dash-card">
                        <div className="dash-card-title">Budget used</div>
                        <div className="dash-donut-center">
                            <DonutChart percent={budgetPercent} />
                        </div>
                        <div className="dash-donut-legend">
                            <span className="dash-legend-dot" style={{ background: "#3db87a" }} />
                            <span className="dash-legend-text">Spent ${totalSpent.toFixed(0)}</span>
                            <span className="dash-legend-dot dash-legend-dot-empty" />
                            <span className="dash-legend-text">Left ${remaining > 0 ? remaining.toFixed(0) : 0}</span>
                        </div>
                    </div>

                    <div className="dash-card">
                        <div className="dash-card-title">Budget breakdown</div>
                        <div className="dash-breakdown-row">
                            <span className="dash-breakdown-label">Total budget</span>
                            <span className="dash-breakdown-val">${totalBudget.toFixed(0)}</span>
                        </div>
                        <div className="dash-breakdown-row">
                            <span className="dash-breakdown-label">Spent</span>
                            <span className="dash-breakdown-val dash-val-red">${totalSpent.toFixed(0)}</span>
                        </div>
                        <div className="dash-breakdown-row">
                            <span className="dash-breakdown-label">Remaining</span>
                            <span className="dash-breakdown-val dash-val-green">${remaining > 0 ? remaining.toFixed(0) : 0}</span>
                        </div>
                        <div className="dash-progress-track" style={{ marginTop: "0.75rem" }}>
                            <div
                                className="dash-progress-fill"
                                style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                            />
                        </div>
                        <div className="dash-progress-label">{Math.round(budgetPercent)}% of monthly budget used</div>
                    </div>
                </div>
            ) : (
                <div style={{ padding: "0 1rem" }}>
                    <Link to="/budget/create" className="dash-setup-budget">
                        <span>💡</span>
                        <span>Set up a budget to track your spending goals</span>
                        <span className="dash-setup-arrow">→</span>
                    </Link>
                </div>
            )}

            {/* Nav cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", padding: "1rem 1rem" }}>
                <Link to="/expenses" className="land-home-card">
                    <div className="feat-label">TRACK</div>
                    <h3>Expenses</h3>
                </Link>
                <Link to="/budget" className="land-home-card">
                    <div className="feat-label">PLAN</div>
                    <h3>Budget</h3>
                </Link>
                <Link to="/profile" className="land-home-card">
                    <div className="feat-label">ACCOUNT</div>
                    <h3>Profile</h3>
                </Link>
                <Link to="/policies" className="land-home-card">
                    <div className="feat-label">INFO</div>
                    <h3>Policies</h3>
                </Link>
            </div>

            {/* Add expense CTA */}
            <div className="dash-add-btn-row">
                <Link to="/expenses/add" className="dash-add-btn">+ Add expense</Link>
            </div>
        </div>
    )
}

export default Home
