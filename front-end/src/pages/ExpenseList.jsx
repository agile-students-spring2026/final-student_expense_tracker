import { Link } from "react-router-dom"
import { useState } from 'react'
import ExpenseTable from "../components/ExpenseTable"
import CategoryExpenseTable from "../components/CategoryExpenseTable"

function ExpenseList({expenses, deleteExpense, deleteCategory, renameCategory, currencySymbol = "$"}) {
    const [sortOption, setSortOption] = useState("newest")
    const [searchItem, setSearchItem] = useState("");
    const [csvError, setCsvError] = useState("");

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
        if(sortOption === "az") return copy.sort((a,b) => a.name.localeCompare(b.name));
        if(sortOption === "za") return copy.sort((a,b) => b.name.localeCompare(a.name));
        if(sortOption === "highest") return copy.sort((a,b) => Number(b.amount) - Number(a.amount));
        if(sortOption === "lowest") return copy.sort((a,b) => Number(a.amount) - Number(b.amount));
        if(sortOption === "oldest") return copy.sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
        return copy.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    function exportExpensesCSV() {
        if (expenses.length === 0) {
            setCsvError("No expenses to export.");
            setTimeout(() => setCsvError(""), 3000);
            return;
        }
        setCsvError("");
        const headers = ["Name", "Amount", "Category", "Details", "Date Added"];
        const rows = expenses.map((expense) => [
            expense.name ?? "",
            expense.amount ?? "",
            expense.category ?? "",
            expense.details ?? "",
            expense.dateAdded ?? ""
        ]);
        const csvRows = [headers, ...rows].map((row) =>
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

            {/* Top row: sort, search, add */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "0.5rem" }}>
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
                <input className="expense-search-bar" type="text" value={searchItem} onChange={(e) => setSearchItem(e.target.value)} />
                <Link to="/expenses/add" className="btn-green" style={{ marginLeft: "auto" }}>+ Add Expense</Link>
            </div>

            {expenses.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                    <p style={{ color: "#aaa", fontSize: "1rem" }}>Nothing to show yet — add an expense to get started.</p>
                </div>
            ) : (
                <>
                    {sortedRegularExpenses.length > 0 && (
                        <>
                            <div className="land-section-label">Uncategorized Expenses</div>
                            <ExpenseTable expenses={sortedRegularExpenses} deleteExpense={deleteExpense} currencySymbol={currencySymbol}/>
                        </>
                    )}

                    {sortedCategorizedExpenses.length > 0 && (
                        <>
                            <div className="land-section-label" style={{ marginTop: "1rem" }}>Categorized Expenses</div>
                            <CategoryExpenseTable
                                expenses={sortedCategorizedExpenses}
                                deleteExpense={deleteExpense}
                                deleteCategory={deleteCategory}
                                renameCategory={renameCategory}
                                currencySymbol={currencySymbol}
                            />
                        </>
                    )}

                    <div className="land-btn-row" style={{ marginTop: "1.5rem", flexDirection: "column", alignItems: "center" }}>
                        {csvError && <p style={{ color: "#e05454", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{csvError}</p>}
                        <button className="btn-plain" onClick={exportExpensesCSV}>Export CSV</button>
                    </div>
                </>
            )}
        </div>
    )
}

export default ExpenseList;