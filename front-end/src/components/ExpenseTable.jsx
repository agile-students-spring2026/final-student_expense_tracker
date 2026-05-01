import ExpenseItem from "./ExpenseItem"

function ExpenseTable({ expenses, deleteExpense, currencySymbol = "$" }) {
    return (
        <div>
            {expenses.length === 0 ? (<></>) : (
                expenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        expense={expense}
                        deleteExpense={deleteExpense}
                        currencySymbol={currencySymbol}
                    />
                ))
            )}
        </div>
    )
}

export default ExpenseTable;