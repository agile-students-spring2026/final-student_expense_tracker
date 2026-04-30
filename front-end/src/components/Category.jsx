import ExpenseItem from "./ExpenseItem"
import { useState } from "react";

function Category({ categoryName, expenses, deleteExpense, deleteCategory, renameCategory }) {
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu() {
        setShowMenu((prev) => !prev);
    }

    function handleDeleteCategory() {
        deleteCategory(categoryName);
        setShowMenu(false);
    }

    function handleRenameCategory() {
        const newName = window.prompt("New category name:", categoryName);
        if (!newName || !newName.trim()) return;
        renameCategory(categoryName, newName.trim());
        setShowMenu(false);
    }

    return (
        <div>
            <div className="land-category-header">
                {categoryName}
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {showMenu && (
                        <>
                            <button className="expense-category-x-btn" onClick={handleRenameCategory}>Rename</button>
                            <button className="expense-category-delete-btn" onClick={handleDeleteCategory}>Delete</button>
                        </>
                    )}
                    <button onClick={toggleMenu} style={{ background: "none", border: "none", color: "#aaa", fontSize: "20px", lineHeight: 1, cursor: "pointer", padding: "0 4px" }}>⋯</button>
                </div>
            </div>
            {expenses.map((expense) => (
                <ExpenseItem
                    key={expense.id}
                    expense={expense}
                    deleteExpense={deleteExpense}
                />
            ))}
        </div>
    )
}

export default Category;