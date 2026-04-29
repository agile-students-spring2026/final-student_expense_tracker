import { useState } from 'react'
import { Link } from "react-router-dom"
import Category from "./Category"

function CategoryExpenseTable({expenses, deleteExpense, deleteCategory, renameCategory}) {
    const groupedExpenses = expenses.reduce((groups, expense) => {
        const category = expense.category || "none";

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(expense);
        return groups;
    }, {});

    return (
        <div> 
            {Object.entries(groupedExpenses).map(([categoryName, categoryExpenses]) => (
                <Category 
                    key={categoryName} 
                    categoryName={categoryName} 
                    expenses={categoryExpenses}
                    deleteExpense={deleteExpense}
                    deleteCategory={deleteCategory}
                    renameCategory={renameCategory}
                />
            ))}
        </div>
    )
}

export default CategoryExpenseTable;