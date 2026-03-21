import { useState } from 'react'
import { Link } from "react-router-dom"
import ExpenseItem from "./ExpenseItem"

function ExpenseTable({expenses}) {

    return (
        <div> 
           {expenses.length == 0 ? (<></>) : (
            expenses.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense} />
            ))
           )}
        </div>
    )
}

export default ExpenseTable;