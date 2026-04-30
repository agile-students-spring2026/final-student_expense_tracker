import { Link } from "react-router-dom"
import { useState } from 'react'
import ExpenseTable from "../components/ExpenseTable"
import CategoryExpenseTable from "../components/CategoryExpenseTable"

function ExpenseList({expenses, deleteExpense, deleteCategory, renameCategory}) {
    const [sortOption, setSortOption] = useState("newest")
    const [searchItem, setSearchItem] = useState("");

    const searchedExpenses = expenses.filter((expense) => {
        const search = searchItem.toLowerCase();
        
        return (
            String(expense.name).toLowerCase().includes(search) ||
            String(expense.category).toLowerCase().includes(search) ||
            String(expense.amount).includes(search) ||
            String(expense.dateAdded).toLowerCase().includes(search)
        );
    });

    function sortExpenses(list) {
        const copy = [...list];

        if(sortOption === "az") {
            return copy.sort((a,b) => a.name.localeCompare(b.name));
        }
        if(sortOption === "za") {
            return copy.sort((a,b) => b.name.localeCompare(a.name));
        }
        if(sortOption === "highest") {
            return copy.sort((a,b) => Number(b.amount) - Number(a.amount));
        }
        if(sortOption === "lowest") {
            return copy.sort((a,b) => Number(a.amount) - Number(b.amount));
        }
        if(sortOption === "oldest") {
            return copy.sort((a,b) => new Date(a.dateAdded) - new Date(b.dateAdded));
        }
        
        return copy.sort((a,b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    }

    function exportExpensesCSV() {
        const headers = ["Name", "Amount", "Category", "Details", "Date Added"];
        const rows = expenses.map((expense) => [
            expense.name ?? "",
            expense.amount ?? "",
            expense.category ?? "",
            expense.details ?? "",
            expense.dateAdded ?? ""
        ]);
        
        const csvRows = [
            headers,
            ...rows].map((row) =>
            row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
        );

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], {type: "text/csv; charset=utf-8;"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "expenses.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    const regularExpenses = searchedExpenses.filter(
        (expense) => !expense.category || expense.category.trim() === ""
    );
    const categorizedExpenses = searchedExpenses.filter(
        (expense) => expense.category && expense.category.trim() !== ""
    );
    
    const sortedRegularExpenses = sortExpenses(regularExpenses);
    const sortedCategorizedExpenses = sortExpenses(categorizedExpenses);


    return (
        <div className="land-page">
            <h2>Expense List</h2>
            <p className="expense-sort">Sort: </p>
            <select className="expense-sort-selector" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="az">A-Z</option>
                <option value="za">Z-A</option>
                <option value="highest">Highest Cost</option>
                <option value="lowest">Lowest Cost</option>
            </select>
            <p className="expense-search">Search: </p>
            <input className="expense-search-bar" type="text" value={searchItem} onChange={(e) => setSearchItem(e.target.value)}></input>
            <button className="expense-export" onClick={exportExpensesCSV}>Export CSV</button>
            <div className="land-section-label">Expenses</div>
            <ExpenseTable expenses={sortedRegularExpenses} deleteExpense={deleteExpense}/>
            <div className="land-section-label" style={{ marginTop: "1rem" }}>Category Expenses</div>
            <CategoryExpenseTable
                expenses={sortedCategorizedExpenses}
                deleteExpense={deleteExpense}
                deleteCategory={deleteCategory}
                renameCategory={renameCategory}
            />
            <div className="land-btn-row" style={{ marginTop: "1.5rem" }}>
                <Link to="/expenses/add" className="btn-green">+ Add Expense</Link>
            </div>
        </div>
    )
}

export default ExpenseList;
