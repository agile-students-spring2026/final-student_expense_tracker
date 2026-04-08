import { Link } from "react-router-dom"
import "./Home.css"

function Home({ expenses = [], budget = { incomeSources: [], fixedExpenses: [] } }) {

    // ===== Stats =====
    const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)
    const totalExpenses = expenses.length

    // ===== Category totals for bar chart =====
    const categories = [...new Set(expenses.filter(e => e.category?.trim()).map(e => e.category.trim()))]
    const categoryTotals = categories.map(cat => {
        const total = expenses
            .filter(e => e.category?.trim() === cat)
            .reduce((sum, e) => sum + Number(e.amount || 0), 0)
        return { name: cat, total }
    }).sort((a, b) => b.total - a.total).slice(0, 5)

    const maxTotal = categoryTotals.length > 0 ? Math.max(...categoryTotals.map(c => c.total)) : 1
    const barColors = ["#3db87a", "#5b8dee", "#f0a500", "#e05454", "#a855f7"]

    // ===== Recent expenses =====
    const recentExpenses = [...expenses].reverse().slice(0, 3)

    // ===== Budget calculations =====
    const periodMultiplier =
        budget?.period === "Weekly" ? 4.33 :
        budget?.period === "Yearly" ? 1 / 12 : 1

    const totalIncome = (budget?.incomeSources || []).reduce((sum, b) => sum + Number(b.amount || 0), 0) * periodMultiplier
    const totalFixed = (budget?.fixedExpenses || []).reduce((sum, b) => sum + Number(b.amount || 0), 0) * periodMultiplier
    const spendableBudget = totalIncome - totalFixed
    const percentSpent = spendableBudget > 0 ? Math.min((totalSpent / spendableBudget) * 100, 100) : 0
    const circumference = 339.3
    const offset = circumference - (percentSpent / 100) * circumference
    const donutColor = percentSpent >= 90 ? "#e05454" : "#3db87a"

    // ===== 50/30/20 split =====
    const needs = totalIncome * 0.5
    const wants = totalIncome * 0.3
    const savings = totalIncome * 0.2

    return (
        <div className="land-page">
            <h2>Home</h2>
            <p className="home-sub">Here's how your spending looks this month</p>

            {/* ===== DASHBOARD BOX ===== */}
            <div className="home-dashboard">
                <p className="feat-label">DASHBOARD</p>

                {/* Stats */}
                <div className="home-stats">
                    <div className="home-stat home-stat-dark">
                        <div className="home-stat-num">${totalSpent.toFixed(0)}</div>
                        <div className="home-stat-lbl">TOTAL SPENT</div>
                    </div>
                    <div className="home-stat">
                        <div className="home-stat-num">{totalExpenses}</div>
                        <div className="home-stat-lbl">EXPENSES</div>
                    </div>
                </div>

                <div className="home-divider" />

                {/* Bar chart + Recent */}
                <div className="home-two-col">
                    <div>
                        <p className="feat-label">SPENDING BY CATEGORY</p>
                        {categoryTotals.length === 0 ? (
                            <p className="home-empty">No expenses yet!</p>
                        ) : (
                            <div className="home-bars">
                                {categoryTotals.map((cat, i) => (
                                    <div key={cat.name} className="home-bar-row">
                                        <div className="home-bar-label">{cat.name}</div>
                                        <div className="home-bar-track">
                                            <div className="home-bar-fill" style={{ width: `${(cat.total / maxTotal) * 100}%`, background: barColors[i % barColors.length] }} />
                                        </div>
                                        <div className="home-bar-amt">${cat.total.toFixed(0)}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div>
                        <p className="feat-label">RECENT EXPENSES</p>
                        {recentExpenses.length === 0 ? (
                            <p className="home-empty">No expenses yet</p>
                        ) : (
                            recentExpenses.map((e, i) => (
                                <div key={i} className="home-recent-item">
                                    <div>
                                        <div className="home-recent-name">{e.name}</div>
                                        <div className="home-recent-cat">{e.category || "Uncategorized"}</div>
                                    </div>
                                    <div className="home-recent-amt">-${Number(e.amount).toFixed(0)}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Budget section */}
                {totalIncome > 0 && (
                    <>
                        <div className="home-divider" />
                        <div className="home-two-col">
                            <div>
                                <p className="feat-label">BUDGET TRACKER</p>
                                <div className="home-donut-row">
                                    <div className="home-donut">
                                        <svg viewBox="0 0 140 140" width="110" height="110">
                                            <circle cx="70" cy="70" r="54" fill="none" stroke="#f5f2eb" strokeWidth="20" />
                                            <circle cx="70" cy="70" r="54" fill="none" stroke={donutColor} strokeWidth="20"
                                                strokeDasharray={circumference} strokeDashoffset={offset}
                                                strokeLinecap="round" transform="rotate(-90 70 70)" />
                                        </svg>
                                        <div className="home-donut-center">
                                            <div className="home-donut-pct">{Math.round(percentSpent)}%</div>
                                            <div className="home-donut-lbl">spent</div>
                                        </div>
                                    </div>
                                    <div className="home-donut-info">
                                        <div className="home-donut-title">${totalSpent.toFixed(0)} spent</div>
                                        <div className="home-donut-sub">of ${spendableBudget.toFixed(0)} spendable this month</div>
                                        <div className="home-legend">
                                            <span><span className="home-dot" style={{ background: donutColor }}></span>Spent ${totalSpent.toFixed(0)}</span>
                                            <span><span className="home-dot home-dot-empty"></span>Left ${Math.max(spendableBudget - totalSpent, 0).toFixed(0)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="feat-label">RECOMMENDED SPLIT — 50 / 30 / 20</p>
                                <div className="home-split-grid">
                                    <div className="home-split-block home-split-needs">
                                        <div className="home-split-pill home-split-pill-needs">NEEDS</div>
                                        <div className="home-split-pct home-split-pct-needs">50%</div>
                                        <div className="home-split-name">Fixed costs</div>
                                        <div className="home-split-amt">${needs.toFixed(0)}</div>
                                    </div>
                                    <div className="home-split-block home-split-wants">
                                        <div className="home-split-pill home-split-pill-wants">WANTS</div>
                                        <div className="home-split-pct home-split-pct-wants">30%</div>
                                        <div className="home-split-name">Spending</div>
                                        <div className="home-split-amt">${wants.toFixed(0)}</div>
                                    </div>
                                    <div className="home-split-block home-split-savings">
                                        <div className="home-split-pill home-split-pill-savings">SAVINGS</div>
                                        <div className="home-split-pct home-split-pct-savings">20%</div>
                                        <div className="home-split-name">Save it</div>
                                        <div className="home-split-amt">${savings.toFixed(0)}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* ===== ADD EXPENSE BUTTON ===== */}
            <div className="home-add-wrap">
                <Link to="/expenses/add" className="btn-green home-add-btn">
                    + Add expense
                </Link>
            </div>

        </div>
    )
}

export default Home