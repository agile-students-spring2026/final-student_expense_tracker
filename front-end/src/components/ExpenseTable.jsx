import { useState } from 'react'
import { Link } from "react-router-dom"
import ExpenseItem from "./ExpenseItem"

function ExpenseTable() {

    return (
        <div> 
            <ExpenseItem/>
            <ExpenseItem/>
            <ExpenseItem/>
        </div>
    )
}

export default ExpenseTable;