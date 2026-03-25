import { useState } from 'react'
import { Link } from "react-router-dom"
import ExpenseItem from "./ExpenseItem"

function Category({categoryName, expenses, deleteExpense, deleteCategory}) {

    return (
        <div> 
            <div className="expenseContainerTop">
                <button className="categoryX" onClick={() => deleteCategory(categoryName)}>X</button>
            </div>
            <div className="expenseContainerBottom">
                <h3 className="categorydetail">{categoryName}</h3>
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