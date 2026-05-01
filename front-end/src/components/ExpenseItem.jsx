import { Link } from "react-router-dom"
import { useState } from "react"

function ExpenseItem({ expense, deleteExpense, currencySymbol = "$" }) {
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu() {
        setShowMenu((prev) => !prev);
    }

    return (
        <div className="land-card-row">
            <div className="expense-item-cell">{expense.name}</div>
            <div className="expense-item-cell">{currencySymbol}{expense.amount}</div>
            <div className="expense-item-cell">{expense.dateAdded}</div>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                {showMenu && (
                    <>
                        <Link to={`/expenses/info/${expense.id}`} className="expense-category-x-btn">Info</Link>
                        <button className="expense-category-delete-btn" onClick={() => { deleteExpense(expense.id); setShowMenu(false); }}>Delete</button>
                    </>
                )}
                <button onClick={toggleMenu} style={{ background: "none", border: "none", color: "#aaa", fontSize: "20px", lineHeight: 1, cursor: "pointer", padding: "0 4px" }}>⋯</button>
            </div>
        </div>
    )
}

export default ExpenseItem;