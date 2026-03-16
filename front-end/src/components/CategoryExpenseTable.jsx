import { useState } from 'react'
import { Link } from "react-router-dom"
import Category from "./Category"

function CategoryExpenseTable() {

    return (
        <div> 
            <Category name="Category1"/>
            <Category name="Category2"/>
            <Category name="Category3"/>
        </div>
    )
}

export default CategoryExpenseTable;