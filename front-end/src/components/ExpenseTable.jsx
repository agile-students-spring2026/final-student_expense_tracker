import { useState } from 'react'
import { Link } from "react-router-dom"
import ExpenseItem from "./ExpenseItem"

function ExpenseTable({expenses, deleteExpense}) {

    return (
        <div> 
           {expenses.length == 0 ? (<></>) : (
            expenses.map((expense) => (
                <ExpenseItem 
                key={expense.id} 
                expense={expense} 
                deleteExpense={deleteExpense}
                />
            ))
           )}
        </div>
    )
}

export default ExpenseTable;