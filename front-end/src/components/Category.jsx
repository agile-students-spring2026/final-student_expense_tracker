import ExpenseItem from "./ExpenseItem"
import { useState } from "react";

function Category({ categoryName, expenses, deleteExpense, deleteCategory, renameCategory }) {
    const [showMenu, setShowMenu] = useState(false);

    function toggleMenu() {
        setShowMenu((prev) => !prev);
    }
    function handleDeleteCaregory() {
        deleteCategory(categoryName)
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
                <div>
                <button className="expense-category-option-btn" onClick={toggleMenu}>...</button>
                {showMenu && (
                    <>
                    <button className="expense-category-x-btn" onClick={handleRenameCategory}>Rename</button>
                    <button className="expense-category-x-btn" onClick={handleDeleteCaregory}>X</button>
                    </>
                    )}
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
