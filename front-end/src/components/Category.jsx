import { useState } from 'react'
import { Link } from "react-router-dom"
import ExpenseItem from "./ExpenseItem"

function Category({name}) {

    return (
        <div> 
            <div className="expenseContainerTop">
                <button className="categoryX">X</button>
            </div>
            <div className="expenseContainerBottom">
                <h3 className="categorydetail">{name}</h3>
            </div>

            <ExpenseItem/>
            <ExpenseItem/>
            <ExpenseItem/>
        </div>
    )
}

export default Category;